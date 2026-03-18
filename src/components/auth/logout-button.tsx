'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const logout = async () => {
    setIsLoading(true)
    const supabase = createClient()
    
    try {
      await supabase.auth.signOut()
      toast.success('Session Terminated', {
        description: 'You have been securely logged out of the console.',
      })
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout Error', {
        description: 'Failed to terminate session properly.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      variant="ghost" 
      onClick={logout} 
      disabled={isLoading}
      className="gap-2 text-on-surface-variant hover:text-error hover:bg-error/10 transition-all font-semibold px-4"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-primary" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      Disconnect Console
    </Button>
  )
}
