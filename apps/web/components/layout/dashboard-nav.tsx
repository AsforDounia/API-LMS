"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DashboardNav() {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("token")
        router.push("/auth/login")
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4 sm:px-8">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <BookOpen className="h-6 w-6" />
                    <span>LMS Platform</span>
                </div>
                <nav className="flex items-center gap-4">
                    <div className="hidden md:flex gap-4 text-sm font-medium text-muted-foreground">
                        <Link href="/dashboard" className="transition-colors hover:text-primary">
                            Dashboard
                        </Link>
                        <Link href="/dashboard/courses" className="transition-colors hover:text-primary">
                            Courses
                        </Link>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Button>
                </nav>
            </div>
        </header>
    )
}
