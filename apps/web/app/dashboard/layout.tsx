"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import api from "@/lib/api"
import { DashboardNav } from "@/components/layout/dashboard-nav"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const validateSession = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                router.push("/auth/login")
                return
            }

            try {
                // Validate token by hitting the profile endpoint
                await api.get("/auth/profile")
                setIsLoading(false)
            } catch (error) {
                // Token invalid or expired
                localStorage.removeItem("token")
                router.push("/auth/login")
            }
        }

        validateSession()
    }, [router])

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-muted/40">
            <DashboardNav />
            <main className="container mx-auto max-w-6xl px-4 py-6">
                {children}
            </main>
        </div>
    )
}

