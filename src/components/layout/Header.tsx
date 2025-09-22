import { Button } from "@/components/ui/custom-button"
import { LogOut, User, Settings, Home, FileText, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { useUserProfile } from "@/hooks/useUserProfile"

interface HeaderProps {
  userRole?: string
  userName?: string
}

export function Header({ userRole, userName }: HeaderProps) {
  const { signOut } = useAuth()
  const { profile, roles } = useUserProfile()
  const location = useLocation()

  const displayName = userName || profile?.full_name || "User"
  const displayRole = userRole || (roles.length > 0 ? roles[0].replace('_', ' ').toUpperCase() : "User")
  
  const isActive = (path: string) => location.pathname === path || (path === '/dashboard' && location.pathname === '/')

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                SIMANIS
              </h1>
              <span className="text-sm text-muted-foreground">
                Sistem Informasi Manajemen Notaris dan Arsip
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              <Link to="/dashboard">
                <Button 
                  variant={isActive('/dashboard') ? "secondary" : "ghost"} 
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              
              <Link to="/services">
                <Button 
                  variant={isActive('/services') ? "secondary" : "ghost"} 
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Layanan</span>
                </Button>
              </Link>
              
              <Link to="/clients">
                <Button 
                  variant={isActive('/clients') ? "secondary" : "ghost"} 
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Klien</span>
                </Button>
              </Link>
            </nav>
          </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{displayName}</span>
            <span className="text-muted-foreground">({displayRole})</span>
          </div>
          
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-1" />
            Keluar
          </Button>
        </div>
        </div>
      </div>
    </header>
  )
}