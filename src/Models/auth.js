import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Authentication = new Schema({
    useName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
});

const authentication = mongoose.model("authentications", Authentication);
export default authentication;
