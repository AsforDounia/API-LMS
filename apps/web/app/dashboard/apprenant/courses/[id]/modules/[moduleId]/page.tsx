"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { modulesApi, Module } from "@/lib/modules";
import api from "@/lib/api";

export default function ModuleContentPage() {

    const params = useParams();
    const router = useRouter();
    const [module, setModule] = useState<Module | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchModule = async () => {
            if (!params.moduleId) return;
            try {
                const data = await modulesApi.getOne(params.moduleId as string);
                setModule(data);
            } catch (err) {
                setError("Erreur lors du chargement du module");
            } finally {
                setLoading(false);
            }
        };
        fetchModule();
    }, [params.moduleId]);

    useEffect(() => {
        const fetchFile = async () => {
            if (!module || !['video', 'pdf'].includes(module.moduleType)) return;
            try {
                const response = await api.get(`/modules/${params.moduleId}/file`, {
                    responseType: 'blob',
                });
                const blob = new Blob([response.data], {
                    type: module.moduleType === 'pdf' ? 'application/pdf' : 'video/mp4',
                });
                const url = URL.createObjectURL(blob);
                setFileUrl(url);
            } catch (err: any) {
                let errorMessage = 'Erreur lors du chargement du fichier';
                if (err.response?.data instanceof Blob) {
                    try {
                        const text = await err.response.data.text();
                        const errorData = JSON.parse(text);
                        errorMessage = errorData.message || errorMessage;
                    } catch {
                        console.log(errorMessage);
                    }
                } else {
                    errorMessage = err.response?.data?.message || err.message || errorMessage;
                }
                setError(errorMessage);
            }
        };
        fetchFile();
    }, [module, params.moduleId]);

    const handleBack = () => {
        router.push(`/dashboard/apprenant/courses/${params.id}/modules`);
    };

    if (loading) {
        return (
            <div className="container mx-auto py-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-pulse text-lg text-gray-600">Chargement...</div>
                </div>
            </div>
        );
    }

    if (error || !module) {
        return (
            <div className="container mx-auto py-6">
                <div className="max-w-3xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-center">{error || "Module non trouvé"}</p>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        if (!fileUrl) {
            return (
                <div className="text-center py-8">
                    <div className="animate-pulse text-lg text-gray-600">Chargement du contenu...</div>
                </div>
            );
        }

        switch (module.moduleType) {
            case 'video':
                return (
                    <div className="w-full">
                        <video
                            controls
                            className="w-full max-h-96 rounded-lg"
                            src={fileUrl}
                        >
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    </div>
                );
            case 'pdf':
                return (
                    <div className="w-full">
                        <iframe
                            src={fileUrl}
                            className="w-full h-96 border rounded-lg"
                            title={module.title}
                        />
                        <div className="mt-4 text-center">
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                Ouvrir le PDF dans un nouvel onglet
                            </a>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Type de contenu non supporté: {module.moduleType}</p>
                    </div>
                );
        }
    };

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Button variant="ghost" onClick={handleBack} className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux modules
                    </Button>
                    <h1 className="text-3xl font-bold">{module.title}</h1>
                    <p className="text-muted-foreground">{module.description}</p>
                </div>
            </div>

            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Contenu du module</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderContent()}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}