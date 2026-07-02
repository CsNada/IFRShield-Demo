import { Outlet, useNavigate, useLocation } from "react-router";
import { IFRShieldLogo } from "./brand";
import { LayoutDashboard, FileCheck, FolderKanban, BookOpen, GitCompare, LogOut, Globe } from "lucide-react";
import { useLanguage } from "../context/language";

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { path: "/", labelKey: "Dashboard", icon: LayoutDashboard },
    { path: "/new-review", labelKey: "New Review", icon: FileCheck },
    { path: "/cases", labelKey: "Cases", icon: FolderKanban },
    { path: "/knowledge-base", labelKey: "Knowledge Base", icon: BookOpen },
    { path: "/compare", labelKey: "Compare Reviews", icon: GitCompare },
  ];

  return (
    <div className="flex min-h-screen" style={{ background: "#FAF8F5" }}>
      <aside className="w-64 flex flex-col shrink-0" style={{ background: "#FFFFFF", borderRight: "1px solid #DDD5CB" }}>
        <div className="p-5" style={{ borderBottom: "1px solid #DDD5CB" }}>
          <IFRShieldLogo size="sm" />
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button key={item.path} onClick={() => navigate(item.path)}
                style={isActive ? { background: "#6B5240" } : {}}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-left ${
                  isActive ? "text-white" : "text-[#5A4A3A] hover:bg-[#EDE8E1] hover:text-[#3D3028]"
                }`}>
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{t(item.labelKey)}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 space-y-1" style={{ borderTop: "1px solid #DDD5CB" }}>
          <div className="flex items-center gap-2 px-3 py-2">
            <Globe className="w-4 h-4 shrink-0" style={{ color: "#B8A898" }} />
            <div className="flex gap-1 flex-1">
              {(["en", "ar"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  style={lang === l ? { background: "#6B5240" } : {}}
                  className={`flex-1 text-xs font-semibold py-1 rounded transition-all ${
                    lang === l ? "text-white" : "text-[#8C7B6E] hover:bg-[#EDE8E1]"
                  }`}>
                  {l === "en" ? "EN" : "\u0639\u0631\u0628\u064a"}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => navigate("/landing")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#EDE8E1]" style={{ color: "#5A4A3A" }}>
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">{t("Sign Out")}</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto" style={{ background: "#FAF8F5" }}><Outlet /></main>
    </div>
  );
}
