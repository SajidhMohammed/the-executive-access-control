"use client"

import * as React from "react"
import { AddCategoryDialog } from "@/components/categories/AddCategoryDialog"
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Folder, ChevronRight, Edit3, Trash2, Box, Info, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Category {
  id: string
  name: string
  description: string | null
  products: { count: number }[]
}

export default function CategoryManagement() {
  const [categories, setCategories] = React.useState<Category[]>([])
  const [loading, setLoading] = React.useState(true)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  const fetchCategories = React.useCallback(async () => {
    setLoading(true)
    try {
      // Primary attempt: Get categories and count of products in each
      // Note: This requires the foreign key relationship to be defined in Supabase
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select(`
          *,
          products(count)
        `)
        .order('name')
      
      if (fetchError) {
        // If it's a relationship error (PGRST200), try fallback without the join
        if (fetchError.code === 'PGRST200') {
          console.warn('Relationship missing in schema, falling back to basic fetch.')
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('categories')
            .select('*')
            .order('name')
          
          if (fallbackError) throw fallbackError
          setCategories((fallbackData as any) || [])
          return
        }
        
        console.error('Supabase Fetch Error Details:', {
          message: fetchError.message,
          code: fetchError.code,
          details: fetchError.details,
          hint: fetchError.hint
        })
        throw fetchError
      }
      setCategories((data as any) || [])
    } catch (error: any) {
      console.error('Detailed fetch error:', error)
      toast.error('Data acquisition failed', {
        description: error.message || 'System could not retrieve architectural classifications.'
      })
    } finally {
      setLoading(false)
    }
  }, [supabase])

  React.useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      const { error } = await supabase.from('categories').delete().eq('id', deleteId)
      if (error) throw error
      
      toast.success('Classification Purged', {
        description: 'The category and association mappings have been removed.'
      })
      fetchCategories()
    } catch (error: unknown) {
      toast.error('Purge Failed', {
        description: error instanceof Error ? error.message : 'System could not eliminate the specified category.'
      })
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header & Primary Action */}
      <section className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/products" className="text-primary hover:opacity-70 flex items-center gap-1.5 text-sm font-bold transition-all group">
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Return to Catalog
            </Link>
          </div>
          <h2 className="font-headline font-semibold text-[2rem] tracking-tight text-primary">Classifications</h2>
          <p className="text-on-surface-variant body-md max-w-md opacity-80 leading-relaxed font-medium">Organizing your global catalog into distinct architectural clusters for precision inventory control.</p>
        </div>
        <AddCategoryDialog />
      </section>

      {/* Categories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 bg-surface-container-low/50 animate-pulse rounded-3xl border border-outline-variant/10"></div>
            ))
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="group bg-surface-container-lowest rounded-3xl overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:shadow-primary/5 p-8 border border-outline-variant/10 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/5">
                  <Folder className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="bg-primary/10 text-primary text-[0.625rem] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                        {category.products?.[0]?.count || 0} ASSETS
                    </span>
                </div>
              </div>
              
              <h3 className="font-headline font-semibold text-xl text-primary mb-2 tracking-tight">{category.name}</h3>
              <p className="text-on-surface-variant text-sm mb-8 line-clamp-3 leading-relaxed font-medium opacity-70">
                {category.description || "No architectural description provided for this classification."}
              </p>
              
              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-6 mt-auto">
                <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:opacity-70 flex items-center gap-1.5 transition-all">
                  Inspect Cluster
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                
                <div className="flex gap-2">
                  <AddCategoryDialog 
                    category={category}
                    trigger={
                      <button className="w-9 h-9 rounded-xl bg-surface-container hover:bg-primary/10 hover:text-primary text-on-surface-variant transition-all flex items-center justify-center shadow-sm">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    }
                  />
                  <button 
                    onClick={() => setDeleteId(category.id)}
                    className="w-9 h-9 rounded-xl bg-surface-container hover:bg-error/10 hover:text-error text-on-surface-variant transition-all flex items-center justify-center shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 h-64 flex flex-col items-center justify-center bg-surface-container-low/20 rounded-3xl border-2 border-dashed border-outline-variant/10 opacity-60">
             <span className="material-symbols-outlined text-4xl mb-4 text-primary/30">inventory</span>
             <p className="font-bold text-on-surface-variant">No classifications identified.</p>
             <p className="text-xs text-on-surface-variant opacity-60 mt-1">Initialize the global structural hierarchy above.</p>
          </div>
        )}

        {/* Action Card */}
        {!loading && (
            <div className="bg-surface-container-low/30 border-2 border-dashed border-outline-variant/20 rounded-3xl flex flex-col items-center justify-center p-8 text-center group hover:border-primary/20 transition-all">
                <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Box className="w-7 h-7 text-outline-variant opacity-50" />
                </div>
                <h4 className="font-headline font-semibold text-on-surface-variant mb-2">New Classification?</h4>
                <p className="text-xs font-medium text-outline-variant mb-8 px-6 leading-relaxed">Expand the architectural hierarchy by registering a new asset cluster.</p>
                <AddCategoryDialog />
            </div>
        )}
      </section>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog 
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        loading={isDeleting}
        title="Purge Classification"
        description="Are you certain you wish to purge this architectural classification? All asset mappings linked to this category will be unassigned."
      />
    </main>
  );
}
