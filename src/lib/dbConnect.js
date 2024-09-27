// src/lib/dbConnect.js
import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://ringtoneboy1530:O0aAQCS7Q4rEXEXb@cluster0.uo0ct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || process.env.MONGO_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

console.log('MongoDB URI:', MONGODB_URI); // Add this line to check the URI

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = { bufferCommands: false };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('Database connected');
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;



// mongodb+srv://ringtoneboy1530:O0aAQCS7Q4rEXEXb@cluster0.uo0ct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0