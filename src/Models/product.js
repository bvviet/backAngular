import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        title: {
            type: String,
        },
        desc: {
            type: String,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "categories",
        },
        isShow: {
            type: Boolean,
        },
        startAt: {
            type: Date,
        },
        endAt: {
            type: Date,
        },
        bidTime: {
            type: Number,
        },
        bidPriceMax: {
            type: Number,
        },
        bids: {
            type: [Schema.Types.ObjectId],
            ref: "bids",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Products = mongoose.model("products", productSchema);
export default Products;
