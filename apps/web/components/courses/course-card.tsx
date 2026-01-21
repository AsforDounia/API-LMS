import { Course } from "@/lib/courses";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          {course.isPublished ? (
            <Badge variant="default" className="shrink-0">
              Published
            </Badge>
          ) : (
            <Badge variant="secondary" className="shrink-0">
              Draft
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm mt-1">
          <User className="h-3.5 w-3.5" />
          <span>
            {course.teacher?.firstName} {course.teacher?.lastName}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link href={`/dashboard/courses/${course._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
