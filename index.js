import express from "express";
import router from "./src/routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/angular";
// Hoặc cấu hình cors chi tiết hơn
app.use(
    cors({
        origin: "http://localhost:4200", // Đặt nguồn bạn muốn cho phép
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // Cho phép gửi cookie nếu cần
        optionsSuccessStatus: 204,
    })
);



app.use("/", router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const connect = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("connected");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

connect();
