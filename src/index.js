import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());

// Hoặc cấu hình cors chi tiết hơn
app.use(
    cors({
        origin: "http://localhost:4200", // Đặt nguồn bạn muốn cho phép
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // Cho phép gửi cookie nếu cần
        optionsSuccessStatus: 204,
    })
);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/", router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/angular");
        console.log("connected");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

connect();
