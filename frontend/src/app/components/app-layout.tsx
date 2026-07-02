import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  BookOpen, 
  ShieldCheck,
  User,
  Bell
} from "lucide-react";
import { Button } from "./ui/button";

export function AppLayout() {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "New Review", href: "/new-review", icon: FileText },
    { name: "Case Management", href: "/cases", icon: FolderOpen },
    { name: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0f172a] rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg text-[#0f172a]">AuditReady AI</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 flex gap-1 border-t border-slate-100">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  active
                    ? "border-[#0f172a] text-[#0f172a]"
                    : "border-transparent text-slate-600 hover:text-[#0f172a] hover:border-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
