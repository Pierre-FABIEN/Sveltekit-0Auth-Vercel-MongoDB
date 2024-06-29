import { writable } from 'svelte/store';

export const users = writable([]);
export const loading = writable(false);
export const error = writable(null);

export const fetchUsers = async () => {
    loading.set(true);
    error.set(null);

    try {
        const res = await fetch('/api');
        if (!res.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await res.json();
        users.set(data.users);
        return data.users; // Renvoie les utilisateurs pour logging
    } catch (err) {
        error.set(err.message);
        return null; // Renvoie null en cas d'erreur
    } finally {
        loading.set(false);
    }
};