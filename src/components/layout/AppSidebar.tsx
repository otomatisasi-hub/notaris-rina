import { useState } from "react"
  import { 
    Home, 
    Users, 
    FileText, 
    Settings, 
    BarChart3, 
    FolderOpen, 
    Archive,
    Shield,
    ChevronDown,
    ChevronRight,
    Gavel
  } from "lucide-react"
  import { NavLink, useLocation } from "react-router-dom"
  import { useUserProfile } from "@/hooks/useUserProfile"
  import * as Collapsible from "@radix-ui/react-collapsible"

  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "@/components/ui/sidebar"

  // Menu items with hierarchical structure
  const menuItems = [
    {
      title: "Beranda SIMANIS",
      url: "/",
      icon: Home,
    },
    {
      title: "Layanan",
      icon: FileText,
      submenu: [
        {
          title: "Notaris",
          url: "/services/notaris",
        },
        {
          title: "Syariah", 
          url: "/services/syariah",
        },
        {
          title: "PPAT",
          url: "/services/ppat",
        },
      ],
    },
    {
      title: "Keuangan",
      url: "/keuangan",
      icon: BarChart3,
    },
    {
  title: "Lokasi Simpan",
      url: "/file-manager",
      icon: FolderOpen,
    },
    {
      title: "Audit Log",
      url: "/audit-log",
      icon: Shield,
    },
    {
      title: "Audit Trail",
      url: "/audit-trail", 
      icon: Shield,
    },
    {
      title: "Pengaturan",
      url: "/settings",
      icon: Settings,
    },
  ]

  export function AppSidebar() {
    const [expandedItems, setExpandedItems] = useState<string[]>(["Layanan"])
    const { state } = useSidebar()
    const collapsed = state === "collapsed"
    const { profile, roles } = useUserProfile()
    const location = useLocation()
    const currentPath = location.pathname

    const toggleExpand = (title: string) => {
      setExpandedItems(prev => 
        prev.includes(title) 
          ? prev.filter(item => item !== title)
          : [...prev, title]
      )
    }

    const isActive = (path: string) => {
      if (path === "/" && currentPath === "/") return true
      if (path !== "/" && currentPath.startsWith(path)) return true
      return false
    }

    const getNavClass = (path: string) => {
      return isActive(path) 
        ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
    }

    return (
      <Sidebar 
        className="transition-all duration-300 border-r bg-card"
        collapsible="icon"
      >
        <SidebarContent className="p-2">
          {/* Brand Section */}
          <div className="px-3 py-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-teal rounded-lg flex items-center justify-center">
                <Gavel className="w-4 h-4 text-white" />
              </div>
              {!collapsed && (
                <div>
                  <h2 className="font-bold text-primary">SIMANIS</h2>
                  <p className="text-xs text-muted-foreground">Sistem Notaris</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <SidebarGroup className="mt-2">
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.submenu ? (
                      <Collapsible.Root 
                        open={expandedItems.includes(item.title)}
                        onOpenChange={() => toggleExpand(item.title)}
                      >
                        <Collapsible.Trigger asChild>
                          <SidebarMenuButton className="h-11 justify-between">
                            <div className="flex items-center space-x-3">
                              <item.icon className="w-5 h-5 flex-shrink-0" />
                              {!collapsed && <span className="font-medium">{item.title}</span>}
                            </div>
                            {!collapsed && (
                              expandedItems.includes(item.title) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )
                            )}
                          </SidebarMenuButton>
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                          <div className="pl-6 space-y-1 mt-2">
                            {item.submenu.map((subItem) => (
                              <SidebarMenuButton key={subItem.title} asChild size="sm" className="h-9">
                                <NavLink 
                                  to={subItem.url}
                                  className={`${getNavClass(subItem.url)} flex items-center text-sm pl-2`}
                                >
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            ))}
                          </div>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    ) : (
                      <SidebarMenuButton asChild className="h-11">
                        <NavLink 
                          to={item.url} 
                          end={item.url === "/"}
                          className={`${getNavClass(item.url)} flex items-center space-x-3 transition-all duration-200`}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          {!collapsed && <span className="font-medium">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User Info */}
          {!collapsed && profile && (
            <div className="mt-auto p-3 border-t bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {profile.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{profile.full_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {roles[0]?.replace('_', ' ') || 'User'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </SidebarContent>
      </Sidebar>
    )
  }