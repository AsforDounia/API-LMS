"use client"

import { useEffect, useState } from "react"
import { Course, getCourses } from "@/lib/courses"
import { CourseList } from "@/components/courses/course-list"
import { Loader2 } from "lucide-react"

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses()
                setCourses(data)
            } catch (err) {
                console.error("Failed to fetch courses:", err)
                setError("Failed to load courses. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchCourses()
    }, [])

    if (isLoading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center text-destructive">
                {error}
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Browse Courses</h1>
            <CourseList courses={courses} />
        </div>
    )
}
