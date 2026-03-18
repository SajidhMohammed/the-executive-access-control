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
import { LogIn, ArrowRight, Loader2 } from 'lucide-react'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      
      toast.success('Welcome back!', {
        description: 'Successfully signed in to your account.',
      })
      router.push('/')
    } catch (error: unknown) {
      toast.error('Authentication Error', {
        description: error instanceof Error ? error.message : 'Invalid login credentials.',
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
            <LogIn className="w-6 h-6 text-on-primary" />
          </div>
          <div className="text-center space-y-1.5">
            <CardTitle className="font-headline font-semibold text-2xl tracking-tight text-primary">Welcome Back</CardTitle>
            <CardDescription className="text-on-surface-variant">Sign in to manage your inventory architecture</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-semibold opacity-80 pl-1">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface-container-low border-outline-variant/10 focus:ring-primary/20 transition-all px-4 h-11"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between pl-1">
                  <Label htmlFor="password" title='Password' className="text-sm font-semibold opacity-80">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[12px] font-bold text-primary hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                  Connect to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <div className="pt-2 text-center text-sm text-on-surface-variant">
              New to the system?{' '}
              <Link href="/auth/sign-up" className="font-bold text-primary hover:underline underline-offset-4 decoration-2">
                Create architectural account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-1.5 font-bold tracking-tighter text-lg italic">STITCH.</div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Enterprise Resource Planning</p>
      </div>
    </div>
  )
}
