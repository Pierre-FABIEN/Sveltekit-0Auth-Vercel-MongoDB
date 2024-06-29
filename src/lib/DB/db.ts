// src/lib/DB/db.ts
import mongoose from 'mongoose';
import { SECRET_API_KEY } from '$env/static/private'

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(SECRET_API_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'DataBaseSvetlekit' 
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};
