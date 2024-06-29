import prisma from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        console.log('Connecting to database...');
        const data = await prisma.data.findMany();
        console.log('Data fetched:', data);
        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error: any) {
        console.error('Failed to fetch data:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data', details: error.message }), { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const requestData = await request.json();
        const newData = await prisma.data.create({
            data: {
                name: requestData.name,
                email: requestData.email,
                password: requestData.password
            }
        });
        console.log('Data created:', newData);
        return new Response(JSON.stringify({ message: 'Data created successfully' }), { status: 201 });
    } catch (error: any) {
        console.error('Failed to create data:', error);
        return new Response(JSON.stringify({ error: 'Failed to create data', details: error.message }), { status: 500 });
    }
};
