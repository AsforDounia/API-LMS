"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';

export default function ModulesCrud() {
  const params = useParams();
  const courseId = params?.courseId;
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', order: 1 });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (!courseId) return;
        const res = await api.get(`/courses/${courseId}/modules`);
        setModules(res.data || []);
      } catch (err) {
        setError('Erreur lors du chargement des modules.');
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, [courseId]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/modules/${editingId}`, { ...form, course: courseId });
      } else {
        await api.post(`/modules`, { ...form, course: courseId });
      }
      setForm({ title: '', description: '', order: 1 });
      setEditingId(null);
      setLoading(true);
      const res = await api.get(`/courses/${courseId}/modules`);
      setModules(res.data || []);
    } catch {
      setError('Erreur lors de la sauvegarde du module.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (module: any) => {
    setForm({ title: module.title, description: module.description, order: module.order });
    setEditingId(module._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce module ?')) return;
    try {
      await api.delete(`/modules/${id}`);
      setModules(modules.filter((m) => m._id !== id));
    } catch {
      setError('Erreur lors de la suppression.');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestion des modules</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre"
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded w-full"
          required
        />
        <input
          name="order"
          type="number"
          value={form.order}
          onChange={handleChange}
          placeholder="Ordre"
          className="border p-2 rounded w-full"
          min={1}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Mettre à jour' : 'Créer'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', order: 1 }); }} className="ml-2 px-4 py-2 rounded border">
            Annuler
          </button>
        )}
      </form>
      <ul className="space-y-4">
        {modules.map((module) => (
          <li key={module._id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <strong>{module.title}</strong>
              <p>{module.description}</p>
              <span className="text-xs text-gray-500">Ordre: {module.order}</span>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(module)} className="bg-yellow-400 px-2 py-1 rounded">Éditer</button>
              <button onClick={() => handleDelete(module._id)} className="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
