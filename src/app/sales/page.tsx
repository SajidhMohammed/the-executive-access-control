"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { 
  Search, 
  ShoppingCart, 
  Users, 
  Truck, 
  DollarSign, 
  Plus, 
  Minus, 
  ArrowLeft,
  Loader2,
  Box,
  Trash2,
  Tag,
  ChevronRight,
  Receipt,
  LayoutGrid,
  CreditCard,
  CreditCardIcon
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
// Import Sheet components from UI
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"

interface Variant {
  id: string
  product_id: string
  name: string
  cost: number
  price: number
  stock: number
  products: {
    name: string
    sku: string
    categories: {
      name: string
    } | null
  }
}

interface CartItem {
  variantId: string
  name: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  stock: number
}

export default function SalesPage() {
  const [variants, setVariants] = React.useState<Variant[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  
  // Multi-item Cart State
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [customerName, setCustomerName] = React.useState("")
  const [courierFee, setCourierFee] = React.useState<string>("0")

  const supabase = createClient()
  const router = useRouter()

  const fetchVariants = React.useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('variants')
        .select(`
          *,
          products (
            name,
            sku,
            categories (
              name
            )
          )
        `)
      
      if (error) throw error
      setVariants(data || [])
    } catch (error: any) {
      toast.error("Failed to fetch products", {
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }, [supabase])

  React.useEffect(() => {
    fetchVariants()
  }, [fetchVariants])

  // Filter logic
  const filteredVariants = variants.filter(v => {
    const searchString = `${v.products.name} ${v.name} ${v.products.sku} ${v.products.categories?.name ?? ''}`.toLowerCase()
    return searchString.includes(searchQuery.toLowerCase())
  })

  // Cart operations
  const addToCart = (variant: Variant) => {
    setCart(prev => {
        const existing = prev.find(item => item.variantId === variant.id)
        if (existing) {
            if (existing.quantity >= variant.stock) {
              toast.error("Insufficient inventory", {
                  description: `Cannot exceed ${variant.stock} units for this asset.`
              })
              return prev
            }
            return prev.map(item => 
              item.variantId === variant.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
        }
        return [...prev, {
            variantId: variant.id,
            name: variant.name,
            productName: variant.products.name,
            sku: variant.products.sku,
            quantity: 1,
            unitPrice: variant.price,
            stock: variant.stock
        }]
    })
    toast.success("Manifest Updated", {
        description: `Staged ${variant.products.name} for execution.`,
        duration: 1500
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.variantId !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
        if (item.variantId === id) {
            const newQty = Math.max(1, Math.min(item.quantity + delta, item.stock))
            return { ...item, quantity: newQty }
        }
        return item
    }))
  }

  const updateUnitPrice = (id: string, price: string) => {
    setCart(prev => prev.map(item => {
        if (item.variantId === id) {
            return { ...item, unitPrice: parseFloat(price) || 0 }
        }
        return item
    }))
  }

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0)
  const total = subtotal + (parseFloat(courierFee) || 0)

  // Checkout flow
  const handleCheckout = async () => {
    if (cart.length === 0) return
    setSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Authentication failure - Identity lost.")

      // 1. Create Order record
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          customer_name: customerName || null,
          courier_fee: parseFloat(courierFee) || 0,
          total_amount: total,
          status: 'completed'
        })
        .select()
        .single()

      if (orderError) throw orderError

      // 2. Prepare order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        variant_id: item.variantId,
        quantity: item.quantity,
        unit_price: item.unitPrice
      }))

      // 3. Batch insert order items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // 4. Update Stock
      for (const item of cart) {
        await supabase
          .from('variants')
          .update({ stock: item.stock - item.quantity })
          .eq('id', item.variantId)
      }

      toast.success("Fulfillment Complete", {
        description: `Order #${order.id.slice(0, 8)} finalized successfully.`,
      })

      // Reset
      setCart([])
      setCustomerName("")
      setCourierFee("0")
      setIsSheetOpen(false)
      fetchVariants()
      router.refresh()
    } catch (error: any) {
      toast.error("Execution Failure", { description: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-10 min-h-screen">
      {/* Header View */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Link href="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4 group font-bold w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-3xl bg-primary text-on-primary flex items-center justify-center shadow-2xl shadow-primary/30">
                <ShoppingCart className="w-8 h-8" />
             </div>
             <div>
                <h2 className="font-headline font-semibold text-[3rem] tracking-tight text-primary leading-none">Order Terminal</h2>
                <p className="text-on-surface-variant font-medium opacity-50 mt-2 uppercase text-[12px] tracking-[0.3em] font-black">Architecture Fulfillment System</p>
             </div>
          </div>
        </div>

        {/* Global Catalog Search */}
        <div className="md:w-[400px] bg-surface-container-low rounded-3xl p-1 flex items-center gap-2 border border-outline-variant/10 shadow-inner group focus-within:border-primary/30 transition-all border">
             <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
               <Search className="w-5 h-5" />
             </div>
             <input 
              className="bg-transparent border-none focus:ring-0 w-full text-body-md placeholder:text-outline-variant/60 font-medium text-lg px-2 h-12 outline-none" 
              placeholder="Filter assets..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
             />
             <div className="px-4 py-2 bg-primary/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary mr-1 shrink-0">
                {filteredVariants.length} Nodes
             </div>
          </div>
      </section>

      {/* Full Grid Catalog */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-32">
        {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-48 bg-surface-container-low animate-pulse rounded-2xl border border-outline-variant/10"></div>
            ))
        ) : filteredVariants.map((v) => (
          <div 
            key={v.id}
            onClick={() => addToCart(v)}
            className="group p-5 rounded-2xl border bg-surface-container-lowest border-outline-variant/10 hover:border-primary/40 hover:bg-surface-container-low transition-all cursor-pointer flex flex-col justify-between h-48 relative overflow-hidden active:scale-[0.97] shadow-sm"
          >
            {/* Visual Flair - Minimal */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="space-y-2 relative z-10">
                <div className="flex justify-between items-start">
                    <span className="text-[8px] uppercase font-black tracking-widest px-2 py-1 rounded-lg bg-primary/5 text-primary border border-primary/5">
                        {v.products.categories?.name || 'Item'}
                    </span>
                    <p className="font-headline font-black text-lg text-primary">${v.price.toFixed(2)}</p>
                </div>
                <div>
                   <h4 className="font-headline font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-1">{v.products.name}</h4>
                   <p className="text-[9px] font-bold font-mono text-on-surface-variant/40 mt-0.5 truncate uppercase tracking-tight">
                       {v.name} · {v.products.sku}
                   </p>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-outline-variant/5 pt-3 mt-auto relative z-10">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-on-surface-variant/30">Available</span>
                    <span className={cn(
                        "text-xs font-black tabular-nums transition-colors",
                        v.stock < 10 && v.stock > 0 ? "text-error" : "text-primary"
                    )}>
                        {v.stock} Units
                    </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all shadow-sm">
                    <Plus className="w-5 h-5" />
                </div>
            </div>
          </div>
        ))}
      </section>

      {/* Floating Action Cart Button - Responsive Position to clear Mobile Nav */}
      {cart.length > 0 && (
         <div className={cn(
             "fixed bottom-32 md:bottom-10 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-bottom-10 fade-in duration-500 transition-all",
             isSheetOpen && "opacity-0 invisible pointer-events-none translate-y-10"
         )}>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger render={
                    <button className="bg-primary text-on-primary px-5 md:px-8 py-4 rounded-full font-black text-sm flex items-center gap-2 md:gap-3 shadow-3xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1 transition-all active:scale-95 group border-2 border-surface shadow-xl">
                        <div className="relative">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-primary text-[10px] flex items-center justify-center shadow-md border border-primary font-black animate-in zoom-in-50">
                                {cart.reduce((a, c) => a + c.quantity, 0)}
                            </span>
                        </div>
                        <span className="tracking-tight hidden md:inline">Inspect Manifest</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <div className="w-px h-5 bg-white/20 mx-1"></div>
                        <span className="font-mono text-base">${total.toFixed(2)}</span>
                    </button>
                } />
                
                <SheetContent className="sm:max-w-md bg-surface-container-lowest p-0 border-outline-variant/10 shadow-3xl flex flex-col h-full gap-0">
                    <SheetHeader className="p-6 pb-4 bg-surface-container-low border-b border-outline-variant/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                <Receipt className="w-5 h-5" />
                            </div>
                            <div>
                                <SheetTitle className="font-headline font-semibold text-xl text-primary leading-none mb-1">Order Manifest</SheetTitle>
                                <SheetDescription className="text-[9px] text-on-surface-variant/40 font-black uppercase tracking-[0.1em]">Transaction Node</SheetDescription>
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-outline-variant/10">
                        {/* Global Fields within Sheet - Compact */}
                        <div className="grid grid-cols-2 gap-3 pb-4 border-b border-outline-variant/5">
                             <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase text-on-surface-variant/40 tracking-widest px-1">Customer</label>
                                <div className="bg-surface-container-low p-2.5 rounded-xl flex items-center gap-2 border border-outline-variant/10">
                                    <Users className="w-3.5 h-3.5 text-primary opacity-30 shrink-0" />
                                    <input 
                                        placeholder="Entity Name"
                                        type="text" 
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="bg-transparent border-none outline-none focus:ring-0 w-full font-medium text-primary text-xs"
                                    />
                                </div>
                             </div>
                             <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase text-on-surface-variant/40 tracking-widest px-1">Logistic ($)</label>
                                <div className="bg-surface-container-low p-2.5 rounded-xl flex items-center gap-2 border border-outline-variant/10">
                                    <Truck className="w-3.5 h-3.5 text-primary opacity-30 shrink-0" />
                                    <input 
                                        type="number" 
                                        value={courierFee}
                                        onChange={(e) => setCourierFee(e.target.value)}
                                        className="bg-transparent border-none outline-none focus:ring-0 w-full font-mono font-bold text-xs text-primary"
                                    />
                                </div>
                             </div>
                        </div>

                        {/* Cart Items List - More Compact */}
                        <div className="space-y-3">
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/30 pl-1">Line Items</h4>
                            {cart.map((item) => (
                                <div key={item.variantId} className="bg-surface-container-low/40 p-4 rounded-2xl border border-outline-variant/10 group animate-in slide-in-from-right-2">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="space-y-0.5">
                                            <h4 className="font-headline font-bold text-sm text-primary leading-tight">{item.productName}</h4>
                                            <p className="text-[9px] text-on-surface-variant/40 font-black uppercase tracking-tight">{item.name} · {item.sku}</p>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.variantId)}
                                            className="w-8 h-8 rounded-lg hover:bg-error/10 text-on-surface-variant/20 hover:text-error transition-all flex items-center justify-center -mt-1 -mr-1"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-3 border-t border-outline-variant/5">
                                        <div className="flex items-center bg-surface-container-high/50 rounded-lg p-1 border border-outline-variant/5">
                                            <button 
                                                onClick={() => updateQuantity(item.variantId, -1)}
                                                className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-primary shadow-sm hover:bg-primary/5 active:scale-90 transition-all font-bold"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center font-headline font-black text-sm text-primary">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.variantId, 1)}
                                                className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-primary shadow-sm hover:bg-primary/5 active:scale-90 transition-all font-bold"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-0.5 justify-end">
                                                <span className="text-[9px] font-bold text-on-surface-variant/20">$</span>
                                                <input 
                                                    type="number"
                                                    value={item.unitPrice}
                                                    onChange={(e) => updateUnitPrice(item.variantId, e.target.value)}
                                                    className="bg-transparent border-none text-right focus:ring-0 font-mono font-black text-sm text-primary w-20 p-0 h-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <SheetFooter className="p-6 pt-4 bg-surface-container-high border-t border-outline-variant/10 shadow-2xl block relative z-10">
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center justify-between text-on-surface-variant/50">
                                <span className="text-[9px] font-black uppercase tracking-widest">Base Valuation</span>
                                <span className="font-mono font-bold text-sm">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-on-surface-variant/50">
                                <span className="text-[9px] font-black uppercase tracking-widest">Logistics</span>
                                <span className="font-mono font-bold text-sm">${(parseFloat(courierFee) || 0).toFixed(2)}</span>
                            </div>
                            <div className="h-px w-full bg-outline-variant/10 my-2"></div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[9px] font-black text-primary/40 uppercase tracking-widest mb-0.5">Final Settlement</p>
                                    <p className="text-3xl font-headline font-black text-primary leading-none tracking-tight">${total.toFixed(2)}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleCheckout}
                            disabled={submitting}
                            className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 h-14"
                        >
                            {submitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <LayoutGrid className="w-5 h-5 opacity-40" />
                                    Complete Fulfillment
                                </>
                            )}
                        </button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
         </div>
      )}

      {/* Empty State */}
      {!loading && filteredVariants.length === 0 && (
         <div className="col-span-full py-40 bg-surface-container-low/20 rounded-[4rem] border-2 border-dashed border-outline-variant/10 flex flex-col items-center justify-center text-center opacity-70 animate-in fade-in duration-700">
             <Box className="w-24 h-24 text-primary/10 mb-8" />
             <h4 className="text-2xl font-headline font-bold text-primary mb-3">No Nodes Identified</h4>
             <p className="text-sm font-medium text-on-surface-variant max-w-sm">The global architectural manifest contains no records matching your current filter parameters.</p>
             <button onClick={() => setSearchQuery("")} className="mt-8 text-primary font-black uppercase text-[10px] tracking-[0.3em] hover:opacity-100 opacity-60 transition-opacity">Reset Filter Catalog</button>
         </div>
      )}
    </main>
  )
}
