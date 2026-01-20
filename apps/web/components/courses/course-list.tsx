import { Course } from "@/lib/courses"
import { CourseCard } from "./course-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BookOpen } from "lucide-react"

interface CourseListProps {
    courses: Course[]
}

export function CourseList({ courses }: CourseListProps) {
    if (courses.length === 0) {
        return (
            <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertTitle>No courses found</AlertTitle>
                <AlertDescription>
                    There are no courses available at the moment. Check back later!
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>
    )
}
