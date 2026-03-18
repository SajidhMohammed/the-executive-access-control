"use client"

import * as React from "react"
import { AddProductDialog } from "@/components/products/AddProductDialog"
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Search, ChevronDown, Filter, Edit3, Trash2, Box, Layers, TrendingUp, AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Variant {
  id: string
  name: string
  cost: number
  price: number
  stock: number
}

interface Product {
  id: string
  name: string
  sku: string
  description: string
  category_id: string | null
  created_at: string
  categories: { name: string } | null
  variants: Variant[]
}

export default function ProductManagement() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  const fetchProducts = React.useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name),
          variants(*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) {
        // If it's a relationship error (PGRST200), try fallback without the join
        if (error.code === 'PGRST200') {
          console.warn('Relationship missing in schema, falling back to basic fetch for products/variants.')
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })
          
          if (fallbackError) throw fallbackError
          setProducts(fallbackData || [])
          return
        }
        
        console.error('Supabase Product Fetch Error:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        throw error
      }
      setProducts(data || [])
    } catch (error: unknown) {
      console.error('Detailed product fetch error:', error)
      toast.error('Data acquisition failed', {
        description: error instanceof Error ? error.message : 'Could not retrieve inventory assets.'
      })
    } finally {
      setLoading(false)
    }
  }, [supabase])

  React.useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const { error } = await supabase.from('products').delete().eq('id', deleteId)
      if (error) throw error
      
      toast.success('Asset Purged', {
        description: 'The product and all associated variants have been removed.'
      })
      fetchProducts()
    } catch (error: unknown) {
      toast.error('Purge Failed', {
        description: error instanceof Error ? error.message : 'System could not eliminate the specified asset.'
      })
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categories?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalValue = products.reduce((acc, p) => {
    const productVal = p.variants?.reduce((vAcc: number, v: Variant) => vAcc + (v.price * v.stock), 0) || 0
    return acc + productVal
  }, 0)

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header & Primary Action */}
      <section className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <h2 className="font-headline font-semibold text-[2.5rem] tracking-tight text-primary">Inventory Assets</h2>
          <p className="text-on-surface-variant body-md max-w-md opacity-80 leading-relaxed font-medium">Curating and managing the global product catalog with architectural precision.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/categories">
            <button className="bg-surface-container-high text-primary px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-all active:scale-95 border border-outline-variant/10 shadow-sm group">
              <Layers className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Classifications
            </button>
          </Link>
          <AddProductDialog />
        </div>
      </section>

      {/* Bento Filter Bar */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-6 bg-surface-container-lowest rounded-2xl px-6 py-3.5 flex items-center gap-3 shadow-sm border border-outline-variant/10 focus-within:border-primary/30 transition-all">
          <Search className="w-5 h-5 text-outline-variant" />
          <input 
            className="bg-transparent border-none focus:ring-0 w-full text-body-md placeholder:text-outline-variant outline-none font-medium" 
            placeholder="Search by name, SKU or category..." 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="md:col-span-3 bg-surface-container-lowest rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-sm cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/10 group">
          <span className="text-on-surface-variant font-bold text-sm tracking-tight opacity-70">Category: All</span>
          <ChevronDown className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors" />
        </div>
        <div className="md:col-span-3 bg-surface-container-lowest rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-sm cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/10 group">
          <span className="text-on-surface-variant font-bold text-sm tracking-tight opacity-70">Filter Status</span>
          <Filter className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors" />
        </div>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading && filteredProducts.map((product) => {
          const totalStock = product.variants?.reduce((acc: number, v: Variant) => acc + v.stock, 0) || 0
          const minPrice = product.variants?.length > 0 
            ? Math.min(...product.variants.map((v: Variant) => v.price))
            : 0
          
          return (
            <div key={product.id} className="group bg-surface-container-lowest rounded-3xl overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:shadow-primary/5 p-8 border border-outline-variant/10 relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
               
               <div className="flex justify-between items-start mb-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                        "text-[0.625rem] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border",
                        totalStock > 20 ? "bg-primary/10 text-primary border-primary/20" : 
                        totalStock > 0 ? "bg-tertiary/10 text-tertiary border-tertiary/20" : 
                        "bg-error/10 text-error border-error/20"
                    )}>
                        {totalStock > 20 ? "Optimized" : totalStock > 0 ? "Low Supply" : "Depleted"}
                    </span>
                    {product.categories?.name && (
                        <span className="text-[0.625rem] font-bold text-on-surface-variant/40 uppercase tracking-widest">{product.categories.name}</span>
                    )}
                  </div>
                  <h3 className="font-headline font-semibold text-xl text-primary leading-tight tracking-tight group-hover:text-primary-container transition-colors">{product.name}</h3>
                  <p className="text-[10px] font-mono text-outline-variant font-bold">{product.sku}</p>
                </div>
                <p className="font-headline font-black text-xl text-primary">${minPrice.toFixed(2)}{product.variants?.length > 1 ? '+' : ''}</p>
              </div>

              <p className="text-on-surface-variant text-sm mb-8 line-clamp-2 font-medium opacity-70 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-6 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-outline-variant uppercase font-black tracking-widest leading-none mb-1">Stock</span>
                    <span className="text-primary font-black text-sm tabular-nums">{totalStock} Units</span>
                  </div>
                  <div className="w-px h-6 bg-outline-variant/20"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-outline-variant uppercase font-black tracking-widest leading-none mb-1">Variants</span>
                    <span className="text-primary font-black text-sm tabular-nums">{product.variants?.length || 0}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <AddProductDialog 
                    product={product}
                    trigger={
                        <button className="w-10 h-10 rounded-xl bg-surface-container hover:bg-primary/10 hover:text-primary text-on-surface-variant transition-all flex items-center justify-center shadow-sm">
                            <Edit3 className="w-4.5 h-4.5" />
                        </button>
                    }
                  />
                  <button 
                    onClick={() => setDeleteId(product.id)}
                    className="w-10 h-10 rounded-xl bg-surface-container hover:bg-error/10 hover:text-error text-on-surface-variant transition-all flex items-center justify-center shadow-sm"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {loading && Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="h-72 bg-surface-container-low/50 animate-pulse rounded-3xl border border-outline-variant/10"></div>
        ))}

        {/* Metric Tile */}
        {!loading && (
            <div className="bg-primary text-on-primary rounded-3xl p-10 flex flex-col justify-between shadow-2xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-headline font-semibold text-2xl tracking-tight">Active Valuation</h3>
                <p className="text-white/70 text-sm font-medium leading-relaxed">Dynamic valuation of current architectural holdings across all active nodes.</p>
              </div>
              <div className="mt-12 relative z-10">
                <p className="text-[10px] text-white/50 uppercase font-black tracking-[0.2em] mb-1">Global Market Value</p>
                <p className="text-[3rem] font-headline font-black tracking-tighter">${(totalValue / 1000000).toFixed(2)}M</p>
              </div>
            </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
            <div className="col-span-full py-20 bg-surface-container-low/20 rounded-3xl border-2 border-dashed border-outline-variant/10 flex flex-col items-center justify-center text-center opacity-70">
                <Box className="w-16 h-16 text-primary/20 mb-6" />
                <h4 className="text-xl font-headline font-bold text-primary mb-2">No Assets Identified</h4>
                <p className="text-sm font-medium text-on-surface-variant max-w-xs">{searchQuery ? `No records matching "${searchQuery}" found in the central repository.` : "The global catalog is currently empty. Initialize the manifest above."}</p>
                {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="mt-6 text-primary font-black uppercase text-[10px] tracking-widest hover:underline">Clear Search Filter</button>
                )}
            </div>
        )}
      </section>

      <DeleteConfirmDialog 
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        loading={isDeleting}
        title="Purge Asset Manifest"
        description="Are you certain you wish to purge this asset from the global registry? This operation will permanently erase the product specs and all configuration variants."
      />
    </main>
  );
}
