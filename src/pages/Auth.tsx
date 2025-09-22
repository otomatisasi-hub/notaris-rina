import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "@/components/auth/LoginForm"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { Button } from "@/components/ui/custom-button"
import cityHeroBackground from "@/assets/city-hero-bg.jpg"
import { useUserRole } from "@/hooks/useUserRole"

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const { role, loading } = useUserRole()

  useEffect(() => {
    if (loading) return
    if (!role) return
    if (role === 'super_admin') navigate('/dashboard')
    else if (role === 'notaris') navigate('/services/notaris')
    else if (role === 'ppat') navigate('/services/ppat')
    else if (role === 'keuangan') navigate('/finance')
  }, [role, loading, navigate])

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative p-4"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(186, 18, 0, 0.9), rgba(56, 178, 172, 0.7)), url(${cityHeroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-primary/20" />
      
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SIMANIS</h1>
          <p className="text-white/90 text-lg">
            Sistem Informasi Manajemen<br />Notaris dan Arsip
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          <div className="text-center">
            <p className="text-white/90 mb-3">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
            </p>
            <Button
              variant="outline"
              onClick={() => setIsLogin(!isLogin)}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              {isLogin ? "Daftar Sekarang" : "Masuk ke Akun"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}