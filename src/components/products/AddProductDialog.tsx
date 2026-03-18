"use client"

import * as React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Trash2, Loader2, Edit2, Box } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

const variantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Variant name is required." }),
  cost: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Cost must be a valid number.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a valid number.",
  }),
})

const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  sku: z.string().min(3, {
    message: "SKU must be at least 3 characters.",
  }),
  categoryId: z.string().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  variants: z.array(variantSchema).optional(),
})

type ProductFormValues = z.infer<typeof productFormSchema>

interface ProductVariant {
  id: string
  name: string
  cost: number
  price: number
  stock: number
}

interface ProductWithVariants {
  id: string
  name: string
  sku: string
  category_id: string | null
  description: string
  variants: ProductVariant[]
}

interface AddProductDialogProps {
  product?: ProductWithVariants
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export function AddProductDialog({ product, open: externalOpen, onOpenChange: setExternalOpen, trigger }: AddProductDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [categories, setCategories] = React.useState<{ id: string; name: string }[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const supabase = createClient()
  const router = useRouter()

  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = setExternalOpen !== undefined ? setExternalOpen : setInternalOpen

  const defaultValues: Partial<ProductFormValues> = {
    name: product?.name || "",
    sku: product?.sku || "",
    categoryId: product?.category_id || "",
    description: product?.description || "",
    variants: product?.variants?.map((v: ProductVariant) => ({
      id: v.id,
      name: v.name,
      cost: v.cost.toString(),
      price: v.price.toString(),
      stock: v.stock.toString(),
    })) || [],
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control: form.control,
  })

  // Fetch categories from Supabase
  React.useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from('categories').select('id, name')
      if (error) {
        console.error('Error fetching categories:', error)
      } else {
        setCategories(data || [])
      }
    }
    if (open) {
      fetchCategories()
    }
  }, [open, supabase])

  // Reset form when product changes or dialog opens
  React.useEffect(() => {
    if (open) {
      form.reset({
        name: product?.name || "",
        sku: product?.sku || "",
        categoryId: product?.category_id || "",
        description: product?.description || "",
        variants: product?.variants?.map((v: ProductVariant) => ({
          id: v.id,
          name: v.name,
          cost: v.cost.toString(),
          price: v.price.toString(),
          stock: v.stock.toString(),
        })) || [],
      })
    }
  }, [product, open, form])

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true)
    try {
      console.log('--- Submission Started ---');
      console.log('Form data:', data);
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('Auth check failed: No user found.');
        throw new Error("No authenticated user found.")
      }
      console.log('Authenticated user:', user.id);

      let productId = product?.id
      if (productId) {
        console.log('Update Path - Product ID:', productId);
        // Update product
        const { error: pError } = await supabase
          .from('products')
          .update({
            name: data.name,
            sku: data.sku,
            category_id: data.categoryId || null,
            description: data.description,
          })
          .eq('id', productId)
        
        if (pError) {
          console.error('Product update error:', pError);
          throw pError
        }
        console.log('Product update successful');

        // Simplified variant handling for update: Delete all and re-insert 
        // Or properly upsert. Here we'll do an upsert approach if ID exists.
        if (data.variants && data.variants.length > 0) {
            // Synchronize variants: Remove those that are no longer in the list
            const currentVariantIds = data.variants.map(v => v.id).filter(id => !!id) as string[];
            
            console.log('Syncing - Keeping current IDs:', currentVariantIds);

            if (currentVariantIds.length > 0) {
               // Use explicit filter format for PostgREST robustness
               const { error: dError } = await supabase
                .from('variants')
                .delete()
                .eq('product_id', productId)
                .filter('id', 'not.in', `(${currentVariantIds.join(',')})`);
               if (dError) console.error('Delete removed variants error:', dError);
            } else if ((product?.variants?.length ?? 0) > 0) {
               await supabase.from('variants').delete().eq('product_id', productId);
            }

            // Separate updates and inserts to avoid ID conflicts or null violations
            const variantsToUpdate = data.variants.filter(v => !!v.id).map(v => ({
              id: v.id,
              product_id: productId,
              name: v.name,
              cost: parseFloat(v.cost) || 0,
              price: parseFloat(v.price) || 0,
              stock: parseInt(v.stock) || 0,
            }))

            const variantsToInsert = data.variants.filter(v => !v.id).map(v => ({
              product_id: productId,
              name: v.name,
              cost: parseFloat(v.cost) || 0,
              price: parseFloat(v.price) || 0,
              stock: parseInt(v.stock) || 0,
            }))
            
            console.log('Syncing - Updates:', variantsToUpdate.length, 'Inserts:', variantsToInsert.length);

            if (variantsToUpdate.length > 0) {
               const { error: uError } = await supabase.from('variants').upsert(variantsToUpdate);
               if (uError) {
                 console.error('Variant update error:', uError);
                 throw uError;
               }
            }

            if (variantsToInsert.length > 0) {
               const { error: iError } = await supabase.from('variants').insert(variantsToInsert);
               if (iError) {
                 console.error('Variant insert error:', iError);
                 throw iError;
               }
            }
            console.log('Variant synchronization complete');
        } else {
          // Delete all variants if list is empty
          await supabase.from('variants').delete().eq('product_id', productId)
        }

        toast.success("Product updated", {
          description: `${data.name} has been successfully modified in the catalog.`,
        })

      } else {
        console.log('Create Path - Submitting new product asset');
        // Create product
        const { data: newProduct, error: pError } = await supabase
          .from('products')
          .insert({
            name: data.name,
            sku: data.sku,
            category_id: data.categoryId || null,
            description: data.description,
            user_id: user.id
          })
          .select()
          .single()
        
        if (pError) {
          console.error('Product insertion error:', pError);
          throw pError
        }
        productId = newProduct.id
        console.log('Product created successfully, ID:', productId);

        // Create variants
        if (data.variants && data.variants.length > 0) {
          console.log('Adding initial variants:', data.variants.length);
          const variantsToInsert = data.variants.map(v => ({
            product_id: productId,
            name: v.name,
            cost: parseFloat(v.cost) || 0,
            price: parseFloat(v.price) || 0,
            stock: parseInt(v.stock) || 0,
          }))

          const { error: vError } = await supabase
            .from('variants')
            .insert(variantsToInsert)
          
          if (vError) {
            console.error('Variant insertion error:', vError);
            throw vError
          }
          console.log('Initial variants added successfully');
        }

        toast.success("Product established", {
          description: `${data.name} has been successfully added to the catalog.`,
        })
      }
      
      setOpen(false)
      form.reset()
      router.refresh()
      console.log('--- Submission Finished ---');
    } catch (error: unknown) {
      console.error('Final Submission Error:', error);
      toast.error("Manifest error", {
        description: error instanceof Error ? error.message : "An unexpected error occurred during data commit.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          (trigger as React.ReactElement) || (
            <button className="bg-primary text-on-primary px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10 group">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Add Product Asset
            </button>
          )
        }
      />
      <DialogContent className="max-w-full sm:max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden p-0 border-outline-variant/10 shadow-3xl bg-surface-container-lowest gap-0 flex flex-col">
        <DialogHeader className="p-6 sm:p-8 pb-4 bg-surface-container-lowest z-10 border-b border-outline-variant/10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner shadow-primary/5">
              {product ? <Edit2 className="w-7 h-7" /> : <Box className="w-7 h-7" />}
            </div>
            <div>
              <DialogTitle className="text-2xl font-headline font-semibold tracking-tight text-primary">
                {product ? "Update Manifest" : "Register Product"}
              </DialogTitle>
              <DialogDescription className="text-on-surface-variant font-medium opacity-70">
                {product 
                  ? "Modify the existing asset specs and variants." 
                  : "Introduce a new architectural asset to the catalog."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col overflow-hidden h-full">
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10 scrollbar-thin scrollbar-thumb-outline-variant/20 scrollbar-track-transparent">
              {/* Core Specs Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center">01</span>
                    <h4 className="font-headline font-semibold text-sm text-primary uppercase tracking-widest opacity-80">Core Specifications</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold opacity-80 pl-1">Product Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Neural Processor X1" 
                            {...field} 
                            className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 h-12 transition-all rounded-xl font-medium"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold opacity-80 pl-1">Identifier (SKU)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="STITCH-NPX1-001" 
                            {...field} 
                            className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 h-12 transition-all rounded-xl uppercase font-mono font-bold"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-1 shadow-sm rounded-2xl bg-surface-container-low/30 border border-outline-variant/5">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem className="p-4 sm:p-6">
                        <FormLabel className="text-sm font-bold opacity-80 pl-1 flex items-center gap-2 mb-2">
                             Classification
                             <span className="text-[10px] font-black uppercase text-outline-variant">Required</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                          <FormControl>
                            <SelectTrigger className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 h-12 transition-all rounded-xl shadow-sm">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-surface-container border-outline-variant/20 rounded-xl shadow-2xl">
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id} className="focus:bg-primary/10 focus:text-primary cursor-pointer py-3 font-medium">
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center">02</span>
                    <h4 className="font-headline font-semibold text-sm text-primary uppercase tracking-widest opacity-80">Narrative Spec</h4>
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold opacity-80 pl-1">Architectural Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Specify the technical nature and precision of this asset..."
                          className="resize-none bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 min-h-[140px] transition-all rounded-xl p-4 font-medium leading-relaxed shadow-inner shadow-black/5"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Variants Section */}
              <div className="space-y-6 pt-6 border-t border-outline-variant/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center">03</span>
                    <div className="space-y-0.5">
                      <h3 className="font-headline font-semibold text-lg text-primary tracking-tight">Variant Matrix</h3>
                      <p className="text-[10px] text-on-surface-variant font-black opacity-60 uppercase tracking-[0.2em]">Configuration Spec</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ name: "", cost: "0", price: "0", stock: "0" })}
                    className="rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-black gap-2 px-6 h-10 transition-all active:scale-95 shadow-sm"
                    disabled={isLoading}
                  >
                    <Plus className="h-4.5 w-4.5" />
                    Define Variant
                  </Button>
                </div>

                {fields.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 rounded-3xl bg-surface-container-low/50 border-2 border-dashed border-outline-variant/10 group hover:border-primary/20 transition-all">
                      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 text-outline-variant/30 group-hover:scale-110 transition-transform">
                        <Box className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-bold text-on-surface-variant opacity-60">No variants established.</p>
                      <p className="text-[10px] text-on-surface-variant/40 mt-1 font-black uppercase tracking-widest">Initialization required</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="group bg-surface-container-low p-5 sm:p-6 rounded-2xl border border-outline-variant/10 transition-all hover:bg-surface-container duration-300 relative flex flex-col gap-5 animate-in fade-in slide-in-from-top-4"
                      >
                        <div className="flex items-center justify-between mb-1">
                             <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-md">ID: {index + 1}</span>
                             <button
                                type="button"
                                onClick={() => remove(index)}
                                disabled={isLoading}
                                className="w-8 h-8 rounded-lg bg-error/5 text-error opacity-40 hover:opacity-100 hover:bg-error/10 transition-all flex items-center justify-center"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                          <FormField
                            control={form.control}
                            name={`variants.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="col-span-1 lg:col-span-1">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Base / Pro" 
                                    {...field} 
                                    className="bg-surface-container border-outline-variant/10 h-11 rounded-xl font-bold"
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.cost`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block text-tertiary">Cost ($)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    className="bg-surface-container border-outline-variant/10 h-11 rounded-xl font-mono tabular-nums font-bold"
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block text-primary">Price ($)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    className="bg-surface-container border-outline-variant/10 h-11 rounded-xl font-mono tabular-nums font-black text-primary"
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.stock`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">Stock</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    {...field} 
                                    className="bg-surface-container border-outline-variant/10 h-11 rounded-xl font-mono tabular-nums font-bold"
                                    disabled={isLoading}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end p-6 sm:p-8 border-t border-outline-variant/10 gap-3 bg-surface-container-lowest shrink-0">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={isLoading}
                className="rounded-xl px-8 h-12 font-bold hover:bg-surface-container text-on-surface-variant transition-all order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-primary text-on-primary hover:opacity-95 rounded-xl px-12 h-12 font-black gap-2 transition-all active:scale-[0.98] shadow-2xl shadow-primary/20 order-1 sm:order-2"
              >
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                )}
                {product ? "Update Changes" : "Create Asset"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
