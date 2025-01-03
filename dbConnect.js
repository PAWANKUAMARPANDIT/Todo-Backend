import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connectionDb = await mongoose.connect(process.env.MONGOURI);
        console.log(`MongoDB connected successfully at: ${connectionDb.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed!", error);
        process.exit(1);
    }
};

export default dbConnect;
