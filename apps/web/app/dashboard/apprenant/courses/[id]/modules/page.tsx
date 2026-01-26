"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
export enum ModuleType {
  PDF = 'pdf',
  VIDEO = 'video',
}

type Module = {
    _id: string;
    title: string;
    description: string;
    order: number;
    isPublished: boolean;
    moduleType: ModuleType;
};

export default function ModulesPage() {
    const params = useParams();
    const router = useRouter();
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/auth/profile");
                setUserId(res.data._id);
            } catch {
                setError("Impossible de récupérer l'utilisateur connecté");
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (!userId || !params.id) return;
        const fetchModules = async () => {
            try {
                const response = await api.get(`/courses/${params.id}/modules`);
                console.log("Modules récupérés :", response);
                setModules(Array.isArray(response.data) ? response.data : []);
            } catch {
                setError("Erreur lors du chargement des modules.");
            } finally {
                setLoading(false);
            }
        };
        fetchModules();
    }, [userId, params.id]);

    const handleViewContent = (moduleId: string) => {
        router.push(`/dashboard/apprenant/courses/${params.id}/modules/${moduleId}`);
    };

    // Fonction pour obtenir l'icône du type de module
    const getModuleTypeIcon = (moduleType?: string) => {
        switch (moduleType?.toLowerCase()) {
            case 'video':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                );
            case 'text':
            case 'article':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            case 'quiz':
            case 'test':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                );
            case 'exercise':
            case 'pratique':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                );
        }
    };

    // Fonction pour obtenir le label du type
    const getModuleTypeLabel = (moduleType?: string) => {
        switch (moduleType?.toLowerCase()) {
            case 'video': return 'Vidéo';
            case 'text': return 'Texte';
            case 'article': return 'Article';
            case 'quiz': return 'Quiz';
            case 'test': return 'Test';
            case 'exercise': return 'Exercice';
            case 'pratique': return 'Pratique';
            default: return moduleType || 'Cours';
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64 bg-gray-900">
                <div className="animate-pulse text-lg text-gray-400">Chargement...</div>
            </div>
        );

    if (error)
        return (
            <div className="max-w-3xl mx-auto mt-8 p-4 bg-red-950 border border-red-800 rounded-lg">
                <p className="text-red-400 text-center">{error}</p>
            </div>
        );

        console.log(modules);
    return (
        <div className=" py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Modules du cours
                    </h1>
                    <p className="text-gray-400">
                        Progressez à votre rythme à travers les modules
                    </p>
                </div> */}

                <div className="space-y-4">
                    {modules?.map((module, index) => (
                        <div
                            key={module._id}
                            className={`group relative rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                                module.isPublished
                                    ? "bg-neutral-900 border border-neutral-800 hover:border-neutral-700"
                                    : "bg-neutral-950 border border-neutral-800"
                            }`}
                        >
                            {/* Barre de couleur latérale */}
                            <div
                                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                    module.isPublished
                                        ? "bg-neutral-800"
                                        : "bg-neutral-700"
                                }`}
                            />

                            <div className="p-6 pl-8">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        {/* Numéro et titre du module */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <span
                                                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                                                    module.isPublished
                                                        ? "bg-neutral-800 text-white border border-neutral-700"
                                                        : "bg-neutral-900 text-gray-500 border border-neutral-800"
                                                }`}
                                            >
                                                {module.order}
                                            </span>
                                            <h2 className="text-xl font-semibold text-white">
                                                {module.title}
                                            </h2>
                                        </div>

                                        {/* Type de module */}
                                        {module.moduleType && (
                                            <div className="flex items-center gap-2 ml-11 mb-3">
                                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                                                    module.isPublished
                                                        ? "bg-neutral-800 text-gray-300"
                                                        : "bg-neutral-900 text-gray-600"
                                                }`}>
                                                    {getModuleTypeIcon(module.moduleType)}
                                                    <span>{getModuleTypeLabel(module.moduleType)}</span>
                                                </div>
                                            </div>
                                        )}

                                        <p className="text-gray-400 leading-relaxed ml-11">
                                            {module.description}
                                        </p>
                                        <p className="text-gray-600 leading-relaxed ml-11">
                                            {module.moduleType}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex-shrink-0 flex flex-col gap-2">
                                        {module.isPublished && (
                                            <button
                                                onClick={() => handleViewContent(module._id)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Voir le contenu
                                            </button>
                                        )}

                                        {/* Badge de statut */}
                                        {module.isPublished ? (
                                            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg">
                                                <svg
                                                    className="w-5 h-5 text-gray-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-300">
                                                    Disponible
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                                                <svg
                                                    className="w-5 h-5 text-gray-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-500">
                                                    Verrouillé
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Overlay pour modules verrouillés */}
                            {!module.isPublished && (
                                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                            )}
                        </div>
                    ))}
                    {modules?.length === 0 && (
                        <div className="text-center py-12 bg-neutral-900 rounded-xl border border-neutral-800">
                            <svg className="w-16 h-16 text-neutral-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <p className="text-gray-500 text-lg">
                                Aucun module disponible pour le moment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}