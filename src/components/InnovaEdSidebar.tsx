
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  BarChart2,
  Book,
  Settings,
  MessageSquare,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, href, isActive, onClick }: SidebarItemProps) => {
  return (
    <Link 
      to={href} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive 
          ? "bg-white/20 text-white font-medium" 
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
      onClick={onClick}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

type InnovaEdSidebarProps = {
  activePath: string;
};

export const InnovaEdSidebar = ({ activePath }: InnovaEdSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const sidebarItems = [
    { icon: Home, label: "Inicio", href: "/dashboard" },
    { icon: Book, label: "Mi Plan", href: "/plan" },
    { icon: Calendar, label: "Calendario", href: "/calendar" },
    { icon: BarChart2, label: "Progreso", href: "/progress" },
    { icon: MessageSquare, label: "Chat IA", href: "/chat" },
    { icon: Settings, label: "Ajustes", href: "/settings" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed top-4 left-4 z-50 md:hidden bg-innovaed-primary text-white border-innovaed-primary/20",
          isOpen && "left-[270px]"
        )}
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-innovaed-primary text-white h-screen w-64 fixed left-0 top-0 z-40 transition-transform duration-300 shadow-lg flex flex-col",
          isMobile && !isOpen && "-translate-x-full"
        )}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Book className="h-8 w-8" />
            <div>
              <h2 className="text-xl font-bold">InnovaEd</h2>
              <p className="text-xs text-white/70">Asistencia Académica</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={activePath === item.href}
              onClick={closeSidebarOnMobile}
            />
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </>
  );
};
