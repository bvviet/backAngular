import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
    },
});

const category = mongoose.model("categories", CategorySchema);
export default category;
