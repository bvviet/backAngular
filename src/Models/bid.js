import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bidModel = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "authentications",
        },
        price: {
            type: Number,
            required: true,
        },
        isWinBid: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Bids = mongoose.model("bids", bidModel);
export default Bids;
