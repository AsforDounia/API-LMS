"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LogOut,
  BookOpen,
  User,
  Loader2,
  LayoutDashboard,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";

export function DashboardNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await api.get("/auth/profile");
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch role:", error);
      }
    };
    fetchRole();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/courses", label: "Courses", icon: GraduationCap },
    ...(userRole === "teacher" || userRole === "admin"
      ? [
        {
          href: "/dashboard/teacher",
          label: "Teacher",
          icon: Briefcase,
        },
      ]
      : []),
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <BookOpen className="h-6 w-6" />
          <span>LMS Platform</span>
        </Link>
        <nav className="flex items-center gap-2">
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-muted-foreground hover:text-destructive"
          >
            {isLoggingOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Log out
          </Button>
        </nav>
      </div>
    </header>
  );
}
