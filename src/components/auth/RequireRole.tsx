import { Navigate } from "react-router-dom"
import { useUserRole } from "@/hooks/useUserRole"

export function RequireRole({ allow, children }: { allow: string[]; children: JSX.Element }) {
  const { role, loading } = useUserRole()
  if (loading) return null
  if (!role || !allow.includes(role)) return <Navigate to="/403" replace />
  return children
}

















