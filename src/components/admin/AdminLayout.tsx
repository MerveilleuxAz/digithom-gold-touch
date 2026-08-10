import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Monitor,
  User,
  Wrench,
  GraduationCap,
  Image,
  Video,
  MessageSquare,
  Mail,
  SlidersHorizontal,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminMessages } from '@/hooks/useContactMessages';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const homeItems: NavItem[] = [
  { title: 'Hero', href: '/admin/hero', icon: <Monitor className="h-4 w-4" /> },
  { title: 'À propos', href: '/admin/about', icon: <User className="h-4 w-4" /> },
];

const contentItems: NavItem[] = [
  { title: 'Services', href: '/admin/services', icon: <Wrench className="h-4 w-4" /> },
  { title: 'Formations', href: '/admin/formations', icon: <GraduationCap className="h-4 w-4" /> },
  { title: 'Portfolio', href: '/admin/portfolio', icon: <Image className="h-4 w-4" /> },
  { title: 'Vidéos', href: '/admin/videos', icon: <Video className="h-4 w-4" /> },
  { title: 'Témoignages', href: '/admin/testimonials', icon: <MessageSquare className="h-4 w-4" /> },
];

const AdminLayout = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { data: messages } = useAdminMessages();
  const unreadCount = messages?.filter((m) => !m.is_read && !m.is_archived).length ?? 0;

  const isActive = (href: string) => location.pathname === href;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <Link to="/admin" className="flex items-center gap-2">
            <img
              src="/lovable-uploads/1f24d38b-a1c7-4a48-86f2-df32e549aa59.png"
              alt="DIGiTHOM"
              className="h-8 w-auto"
            />
            <span className="font-bold gold-gradient-text group-data-[collapsible=icon]:hidden">
              DIGiTHOM
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive('/admin')} tooltip="Tableau de bord">
                    <Link to="/admin">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Tableau de bord</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Page d'accueil</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {homeItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.title}>
                      <Link to={item.href}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Contenu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {contentItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.title}>
                      <Link to={item.href}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive('/admin/messages')} tooltip="Messages">
                    <Link to="/admin/messages">
                      <Mail className="h-4 w-4" />
                      <span>Messages</span>
                    </Link>
                  </SidebarMenuButton>
                  {unreadCount > 0 && <SidebarMenuBadge>{unreadCount}</SidebarMenuBadge>}
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive('/admin/settings')} tooltip="Paramètres">
                    <Link to="/admin/settings">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Paramètres</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Se déconnecter</span>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex items-center justify-between gap-4 border-b border-border p-4 md:p-6">
          <div className="flex items-center gap-3 min-w-0">
            <SidebarTrigger />
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">{title}</h1>
              {description && <p className="text-sm text-muted-foreground truncate">{description}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-gold-500 transition-colors">
              ← Voir le site
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
