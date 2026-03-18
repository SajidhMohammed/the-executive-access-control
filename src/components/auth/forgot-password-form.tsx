'use client'

import { useState } from 'react'
import Link from 'next/link'
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
import { KeyRound, Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      if (error) throw error
      
      setSuccess(true)
      toast.success('Reset Link Dispatched', {
        description: 'Security protocols have initiated a recovery email.',
      })
    } catch (error: unknown) {
      toast.error('Recovery Failed', {
        description: error instanceof Error ? error.message : 'System could not verify recovery path.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="border-outline-variant/10 shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-primary-container to-tertiary"></div>
        {success ? (
          <>
            <CardHeader className="space-y-4 pt-10 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group animate-bounce-slow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <CardTitle className="font-headline font-semibold text-2xl tracking-tight text-primary">Check Your Inbox</CardTitle>
                <CardDescription className="text-on-surface-variant max-w-[280px] mx-auto">
                    We&apos;ve dispatched a secure recovery link to {email}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-10 text-center">
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 px-4 opacity-70">
                If the address is registered in our network, you will receive instructions to reset your architectural access credentials.
              </p>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full gap-2 border-primary/20 hover:bg-primary/5 text-primary">
                   <ArrowLeft className="w-4 h-4" />
                   Back to Command Console
                </Button>
              </Link>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="space-y-4 pt-8">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/20">
                <KeyRound className="w-6 h-6 text-on-primary" />
              </div>
              <div className="text-center space-y-1.5">
                <CardTitle className="font-headline font-semibold text-2xl tracking-tight text-primary">Recover Access</CardTitle>
                <CardDescription className="text-on-surface-variant">Re-establish your connection to the dashboard</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-8">
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-semibold opacity-80 pl-1">Identified Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      required
                      value={email}
                      disabled={isLoading}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 transition-all pl-10 pr-4 h-11"
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
                      Dispatch Recovery Link
                    </>
                  )}
                </Button>

                <div className="pt-2 text-center text-sm text-on-surface-variant">
                  Remembered your keys?{' '}
                  <Link href="/auth/login" className="font-bold text-primary hover:underline underline-offset-4 decoration-2">
                    Back to login
                  </Link>
                </div>
              </form>
            </CardContent>
          </>
        )}
      </Card>
      <div className="flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-1.5 font-bold tracking-tighter text-lg italic">STITCH.</div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Secure Recovery Sector</p>
      </div>
    </div>
  )
}
