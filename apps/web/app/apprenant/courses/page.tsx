"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

type Module = {
    _id: string;
    title: string;
    description: string;
    order: number;
    isPublished: boolean;
};

export default function CoursesPage() {
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const userId = "6964d698c3ad6585736fca5c";
    const courseId = "696520b2ecc22cbcf1212d2f";
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await api.get(
                    `/enrollments/modules/${courseId}/${userId}`
                );                
                setModules(response.data);
            } catch (err) {
                setError("Erreur lors du chargement des modules.");
            } finally {
                setLoading(false);
            }
        };
        fetchModules();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-64">Chargement...</div>;
    if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Modules du cours</h1>
            <div className="space-y-6">
                {modules?.map((module) => (
                    <div
                        key={module._id}
                        className={`rounded-lg shadow-md p-6 border flex items-center justify-between transition bg-white ${module.isPublished ? "" : "opacity-60"}`}
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-semibold">{module.title}</span>
                                {!module.isPublished && (
                                    <span className="ml-2 px-2 py-0.5 text-xs rounded bg-gray-300 text-gray-700">Verrouillé</span>
                                )}
                            </div>
                            <p className="text-gray-600">{module.description}</p>
                        </div>
                        <div>
                            {module.isPublished ? (
                                <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded">Déverrouillé</span>
                            ) : (
                                <span className="inline-block px-3 py-1 text-sm font-medium bg-red-100 text-red-700 rounded">Verrouillé</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}