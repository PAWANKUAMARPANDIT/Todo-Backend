import dotenv from "dotenv";
import dbConnect from "./dbConnect.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

dbConnect()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`⚙️ Server is running at port : ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed!", err);
    });
