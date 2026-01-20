import api from "./api"

export interface Course {
    _id: string
    title: string
    description: string
    instructor: {
        _id: string
        firstName: string
        lastName: string
    }
    isPublished: boolean
    createdAt: string
    updatedAt: string
}

export async function getCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>("/courses")
    return response.data
}
