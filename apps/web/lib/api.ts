import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
})

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token")
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add a response interceptor for 401 handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== "undefined" && error.response?.status === 401) {
            // Don't redirect if already on auth pages
            const isAuthPage = window.location.pathname.startsWith("/auth")
            if (!isAuthPage) {
                localStorage.removeItem("token")
                window.location.href = "/auth/login"
            }
        }
        return Promise.reject(error)
    }
)

export default api

