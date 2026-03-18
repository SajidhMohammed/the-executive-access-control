"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Plus, Edit2 } from "lucide-react"

const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  description: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

interface AddCategoryDialogProps {
  category?: {
    id: string
    name: string
    description: string | null
  }
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export function AddCategoryDialog({ category, open: externalOpen, onOpenChange: setExternalOpen, trigger }: AddCategoryDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const supabase = createClient()

  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = setExternalOpen !== undefined ? setExternalOpen : setInternalOpen

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
  })

  // Reset form when category changes or dialog opens for a new category
  React.useEffect(() => {
    if (open) {
      form.reset({
        name: category?.name || "",
        description: category?.description || "",
      })
    }
  }, [category, open, form])

  async function onSubmit(data: CategoryFormValues) {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("No authenticated user found.")

      if (category?.id) {
        // Update
        const { error } = await supabase
          .from('categories')
          .update({
            name: data.name,
            description: data.description,
          })
          .eq('id', category.id)
        
        if (error) throw error
        toast.success("Category updated", {
          description: `${data.name} has been successfully updated.`,
        })
      } else {
        // Create
        const { error } = await supabase
          .from('categories')
          .insert({
            name: data.name,
            description: data.description,
            user_id: user.id
          })
        
        if (error) throw error
        toast.success("Category added", {
          description: `${data.name} box has been successfully created.`,
        })
      }
      
      setOpen(false)
      form.reset()
      router.refresh()
    } catch (error: unknown) {
      toast.error("Operation failed", {
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
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
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/10">
              <span className="material-symbols-outlined">add</span>
              Add Category
            </button>
          )
        }
      />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {category ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <DialogTitle className="text-xl font-headline font-semibold">
              {category ? "Update Classification" : "New Classification"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-on-surface-variant">
            {category 
              ? "Modify the existing architectural classification for your assets." 
              : "Group your inventory items by defining a new architectural classification."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold pl-1">Category Name</FormLabel>
                  <FormControl>
                    <Input 
                        placeholder="e.g. Wearables" 
                        {...field} 
                        className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 h-11 transition-all"
                        disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold pl-1">Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Define the scope and nature of this category..." 
                      className="resize-none bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 min-h-[120px] transition-all" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4 border-t gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                disabled={isLoading}
                className="rounded-xl px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-primary text-on-primary hover:opacity-90 rounded-xl px-8 font-bold gap-2 shadow-lg shadow-primary/10"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-on-primary" />}
                {category ? "Commit Update" : "Establish Category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
