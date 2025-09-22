import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        if (isMounted) { setRole(null); setLoading(false) }
        return
      }
      const { data, error } = await supabase.rpc("current_user_role")
      if (!isMounted) return
      if (error) {
        setRole(null)
      } else {
        setRole((data as string) ?? null)
      }
      setLoading(false)
    })()
    return () => { isMounted = false }
  }, [])

  return { role, loading }
}

















