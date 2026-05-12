"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  FileText,
  Handshake,
  LayoutDashboard,
  Megaphone,
  Receipt,
  Settings,
  Target,
  TrendingUp,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/tasks", label: "Tasks", icon: ClipboardList },
  { href: "/expenses", label: "Expenses", icon: Receipt },
  { href: "/revenue", label: "Revenue", icon: TrendingUp },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/content", label: "Content", icon: Megaphone },
  { href: "/partnerships", label: "Partnerships", icon: Handshake },
  { href: "/social-media", label: "Social Media", icon: Target },
  { href: "/meetings", label: "Meetings", icon: CalendarDays },
  { href: "/ai-systems", label: "AI Systems", icon: Bot },
  { href: "/proposals", label: "Proposals", icon: FileText },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-5">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Operations</p>
            <h1 className="mt-1 text-xl font-bold tracking-normal">Command Dashboard</h1>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (pathname === "/" && item.href === "/dashboard");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    active && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Unified business command center</p>
              <p className="text-sm text-muted-foreground">Projects, finance, teams, clients, content, and AI systems in one operating rhythm.</p>
            </div>
            <div className="rounded-md border bg-background px-3 py-2 text-sm font-medium">Q2 Operating Cycle</div>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
