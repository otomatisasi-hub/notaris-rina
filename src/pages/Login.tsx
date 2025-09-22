import { LoginForm } from "@/components/auth/LoginForm"
import cityHeroBackground from "@/assets/city-hero-bg.jpg"

export function LoginPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(30, 64, 175, 0.8), rgba(56, 178, 172, 0.7)), url(${cityHeroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-primary/20" />
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SIMANIS</h1>
          <p className="text-white/90 text-lg">
            Sistem Informasi Manajemen<br />Notaris dan Arsip
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  )
}