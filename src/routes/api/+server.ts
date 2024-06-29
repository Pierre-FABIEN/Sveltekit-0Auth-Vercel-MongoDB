// src/routes/api/+server.ts
import { connectToDatabase } from '$lib/DB/db';
import { User } from '$lib/DB/schema/user';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    await connectToDatabase();

    try {
        const users = await User.find();
        console.log('Users fetched:', users); // Log des utilisateurs récupérés
        console.log('Database name:', User.db.name); // Log du nom de la base de données
        console.log('Collection name:', User.collection.name); // Log du nom de la collection
        return new Response(JSON.stringify({ users }), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    await connectToDatabase();

    try {
        const data = await request.json();
        const newUser = new User(data);
        await newUser.save();
        console.log('User created:', newUser); // Log de l'utilisateur créé
        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
    } catch (error) {
        console.error('Failed to create user:', error);
        return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
    }
};
