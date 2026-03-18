'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ShieldAlert, CheckCircle, Loader2 } from 'lucide-react'

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    
    if (password !== repeatPassword) {
      toast.error('Missaligned Passwords', {
        description: 'Ensure both password fields match exactly.',
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      
      toast.success('Security Updated', {
        description: 'Your administrative password has been successfully rotated.',
      })
      router.push('/protected')
    } catch (error: unknown) {
      toast.error('Resolution Failed', {
        description: error instanceof Error ? error.message : 'System could not update security parity.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="border-outline-variant/10 shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-primary-container to-tertiary"></div>
        <CardHeader className="space-y-4 pt-8">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/20">
            <ShieldAlert className="w-6 h-6 text-on-primary" />
          </div>
          <div className="text-center space-y-1.5">
            <CardTitle className="font-headline font-semibold text-2xl tracking-tight text-primary">Rotate Access Keys</CardTitle>
            <CardDescription className="text-on-surface-variant">Update your architectural credentials for secure access</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="password" title='New Password' className="text-sm font-semibold opacity-80 pl-1">New Secure Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  required
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 transition-all px-4 h-11"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repeat-password" title='Repeat Password' className="text-sm font-semibold opacity-80 pl-1">Confirm New Password</Label>
                <Input
                  id="repeat-password"
                  type="password"
                  placeholder="Repeat your password"
                  required
                  value={repeatPassword}
                  disabled={isLoading}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 transition-all px-4 h-11"
                />
              </div>
            </div>

            <Button 
                type="submit" 
                className="w-full h-11 bg-primary text-on-primary hover:opacity-90 rounded-xl font-semibold gap-2 transition-all active:scale-[0.98] shadow-lg shadow-primary/10"
                disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Commit Security Update
                  <CheckCircle className="w-4 h-4 text-on-primary" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-1.5 font-bold tracking-tighter text-lg italic">STITCH.</div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Security Encryption Protocol</p>
      </div>
    </div>
  )
}
