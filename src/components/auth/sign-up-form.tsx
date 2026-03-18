'use client'

import { useRouter } from 'next/navigation'
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
import { UserPlus, ArrowRight, Loader2, ShieldCheck } from 'lucide-react'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      })
      if (error) throw error
      
      toast.success('Registration Initiated', {
        description: 'Please check your inbox to verify your corporate account.',
      })
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      toast.error('Registration Failed', {
        description: error instanceof Error ? error.message : 'System could not initialize account.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="border-outline-variant/10 shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-tertiary via-primary-container to-primary"></div>
        <CardHeader className="space-y-4 pt-8">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-tertiary to-primary flex items-center justify-center shadow-lg shadow-tertiary/20">
            <UserPlus className="w-6 h-6 text-on-tertiary" />
          </div>
          <div className="text-center space-y-1.5">
            <CardTitle className="font-headline font-semibold text-2xl tracking-tight text-primary">Forge Your Identity</CardTitle>
            <CardDescription className="text-on-surface-variant">Create an enterprise account to access the control plane</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-semibold opacity-80 pl-1">Corporate Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="architect@stitch.io"
                  required
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 transition-all px-4 h-11"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password" title='Password' className="text-sm font-semibold opacity-80 pl-1">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    disabled={isLoading}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 transition-all px-4 h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="repeat-password" title='Repeat Password' className="text-sm font-semibold opacity-80 pl-1">Confirm</Label>
                  <Input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    disabled={isLoading}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 transition-all px-4 h-11"
                  />
                </div>
              </div>
            </div>

            <div className="bg-surface-container-highest/20 rounded-lg p-3 flex items-start gap-3 border border-outline-variant/10">
                <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-[11px] leading-relaxed text-on-surface-variant">By initializing this account, you agree to the <span className="text-primary font-bold cursor-pointer hover:underline">Service Architecture Protocols</span> and data residency policies.</p>
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
                  Generate Credentials
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <div className="pt-2 text-center text-sm text-on-surface-variant">
              System access established?{' '}
              <Link href="/auth/login" className="font-bold text-primary hover:underline underline-offset-4 decoration-2">
                Sign in to console
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-1.5 font-bold tracking-tighter text-lg italic">STITCH.</div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Security Verified Node</p>
      </div>
    </div>
  )
}
