"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { showSuccess, showError } from "@/components/ui/toast";
    import { useRouter } from "next/navigation";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "student",
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users");
                setUsers(res.data || []);
            } catch (err) {
                setError("Erreur lors du chargement des utilisateurs.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const router = useRouter();
    useEffect(() => {
        const checkRoleAndFetch = async () => {
            try {
                const profile = await api.get("/auth/profile");
                if (profile.data.role !== "admin") {
                    router.replace("/dashboard");
                    return;
                }
                const res = await api.get("/users");
                setUsers(res.data || []);
            } catch (err) {
                setError("Erreur lors du chargement des utilisateurs.");
            } finally {
                setLoading(false);
            }
        };
        checkRoleAndFetch();
    }, [router]);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Supprimer cet utilisateur ?")) return;
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter((u) => u._id !== id));
            showSuccess("Utilisateur supprimé avec succès");
        } catch {
            setError("Erreur lors de la suppression.");
            showError("Erreur lors de la suppression");
        }
    };

    const handleAdd = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            role: "student",
        });
        setShowForm(true);
    };

    const handleSubmitForm = async () => {
        try {
            const res = await api.post("/users", formData);
            setUsers([...users, res.data]);
            setShowForm(false);
            showSuccess("Utilisateur ajouté avec succès");
        } catch (err) {
            setError("Erreur lors de l'enregistrement.");
            showError("Erreur lors de l'enregistrement");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-lg text-gray-400">Chargement...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-950 border border-red-800 rounded-lg">
                <p className="text-red-400 text-center">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* En-tête avec bouton */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Gestion des utilisateurs</h2>
                        <p className="text-gray-400">Gérez les comptes et les permissions des utilisateurs</p>
                    </div>

                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Ajouter un utilisateur
                    </button>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-card border border-gray-700 rounded-xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-500/20 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total utilisateurs</p>
                                <p className="text-2xl font-bold text-white">{users.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-gray-700 rounded-xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-500/20 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Administrateurs</p>
                                <p className="text-2xl font-bold text-white">
                                    {users.filter(u => u.role === 'admin').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-gray-700 rounded-xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-500/20 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Utilisateurs standards</p>
                                <p className="text-2xl font-bold text-white">
                                    {users.filter(u => u.role === 'user').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tableau */}
                <div className="bg-card border border-gray-700 rounded-xl overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-card border-b border-gray-700">
                                <tr>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">
                                        Utilisateur
                                    </th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">
                                        Email
                                    </th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-300">
                                        Rôle
                                    </th>
                                    <th className="py-4 px-6 text-center text-sm font-semibold text-gray-300">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className={`border-b border-gray-700 hover:bg-gray-750 transition-colors ${index % 2 === 0 ? 'bg-card' : 'bg-gray-850'
                                            }`}
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </div>
                                                <span className="text-white font-medium">
                                                    {user.firstName} {user.lastName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-400">{user.email}</td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${user.role === "admin"
                                                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                                        : user.role === "teacher"
                                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                                    }`}
                                            >
                                                {user.role === "admin" ? (
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                        />
                                                    </svg>
                                                ) : user.role === "teacher" ? (
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422A12.083 12.083 0 0112 20.055a12.083 12.083 0 01-6.16-9.477L12 14z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                )}

                                                {user.role === "admin"
                                                    ? "Administrateur"
                                                    : user.role === "teacher"
                                                        ? "Enseignant"
                                                        : "Etudiant"}
                                            </span>

                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-2">
                                               
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <p className="text-gray-400 text-lg">Aucun utilisateur trouvé</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de formulaire */}
            {showForm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-card border border-gray-700 rounded-xl w-full max-w-md shadow-2xl">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Ajouter un utilisateur
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Jean"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full bg-card border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Dupont"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-card border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="jean.dupont@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-card border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Rôle
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-card border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    >
                                        <option value="student">Etudiant</option>
                                        <option value="teacher">Enseignant</option>
                                        <option value="admin">Administrateur</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white rounded-lg transition-all duration-200 font-medium"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSubmitForm}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg transition-all duration-200 font-medium shadow-lg"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}