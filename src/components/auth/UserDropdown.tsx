'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { LogOut, User as UserIcon, Settings, Shield, Loader2 } from 'lucide-react'
import { type User } from '@supabase/supabase-js'

interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
}

export function UserDropdown() {
  const [user, setUser] = React.useState<User | null>(null)
  const [profile, setProfile] = React.useState<Profile | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const supabase = createClient()
  const router = useRouter()

  React.useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profile)
      }
    }
    getUserData()
  }, [supabase])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      toast.success('Session Terminated', {
        description: 'You have been securely logged out.',
      })
      router.push('/auth/login')
      router.refresh()
    } catch (error) {
      toast.error('Logout Failed', {
        description: 'An error occurred during session termination.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'User'
  const email = user.email
  const avatarUrl = profile?.avatar_url || `https://avatar.vercel.sh/${email}.png`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-3 hover:opacity-80 transition-opacity p-0.5 rounded-full">
          <Avatar className="h-9 w-9 border border-outline-variant/20 shadow-sm">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
              {displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 border-outline-variant/10 shadow-xl overflow-hidden p-0">
        <div className="bg-surface-container-low p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-primary font-headline tracking-tight">{displayName}</p>
            <p className="text-xs text-on-surface-variant truncate opacity-70">{email}</p>
          </div>
        </div>
        <DropdownMenuSeparator className="m-0" />
        <DropdownMenuGroup className="p-1.5">
          <DropdownMenuItem className="gap-2.5 py-2 cursor-pointer rounded-md">
            <UserIcon className="h-4 w-4 text-on-surface-variant/70" />
            <span className="font-medium text-sm">Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2.5 py-2 cursor-pointer rounded-md">
            <Shield className="h-4 w-4 text-on-surface-variant/70" />
            <span className="font-medium text-sm">Security Protocols</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2.5 py-2 cursor-pointer rounded-md">
            <Settings className="h-4 w-4 text-on-surface-variant/70" />
            <span className="font-medium text-sm">Preferences</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="m-0" />
        <div className="p-1.5">
          <DropdownMenuItem 
            onClick={handleLogout}
            disabled={isLoading}
            className="gap-2.5 py-2 cursor-pointer rounded-md text-error focus:bg-error/10 focus:text-error"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span className="font-bold text-sm">Terminate Session</span>
          </DropdownMenuItem>
        </div>
        <div className="bg-surface-container-high/30 px-4 py-2 flex items-center justify-between">
           <span className="text-[10px] font-bold uppercase tracking-widest text-outline-variant opacity-60 italic">Stitch OS</span>
           <span className="text-[9px] font-mono text-outline-variant opacity-40">v0.1.0-alpha</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
