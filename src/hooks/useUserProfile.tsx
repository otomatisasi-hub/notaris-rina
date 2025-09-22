import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface UserProfile {
  id: string
  user_id: string
  full_name: string
  employee_id?: string
  phone?: string
  created_at: string
  updated_at: string
}

interface UserRole {
  role: 'super_admin' | 'administrator' | 'staf_ppat' | 'staf_notaris'
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [roles, setRoles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
          return
        }

        setProfile(profileData)

        // Fetch user roles
        const { data: rolesData, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)

        if (rolesError) {
          console.error('Error fetching roles:', rolesError)
          return
        }

        setRoles(rolesData?.map((r: UserRole) => r.role) || [])
      } catch (error) {
        console.error('Error in fetchProfile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchProfile()
    })

    return () => subscription.unsubscribe()
  }, [])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return false

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error updating profile:', error)
        return false
      }

      // Refresh profile data
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (updatedProfile) {
        setProfile(updatedProfile)
      }

      return true
    } catch (error) {
      console.error('Error in updateProfile:', error)
      return false
    }
  }

  const hasRole = (role: string) => {
    return roles.includes(role)
  }

  const isAdmin = () => {
    return hasRole('super_admin') || hasRole('administrator')
  }

  return {
    profile,
    roles,
    loading,
    updateProfile,
    hasRole,
    isAdmin
  }
}