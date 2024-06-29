// src/lib/DB/schema/user.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'data' });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
