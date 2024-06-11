import bid from "../Models/bid.js";
import Products from "../Models/product.js";

class BidsController {
    // Get all
    async getBids(req, res) {
        try {
            const bids = await bid.find();
            res.status(200).json({
                message: "Get success",
                data: bids,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    // Create bid
    async createBid(req, res, next) {
        try {
            // Tạo một lượt đấu giá mới
            // const newBid = await bid.create(req.body);

            // // Tìm sản phẩm bằng ID và lấy danh sách bids hiện tại
            // const product = await Products.findById(req.body.productId);

            // // Kiểm tra xem sản phẩm có tồn tại không
            // if (!product) {
            //     return res.status(404).json({ message: "Product not found" });
            // }

            // // Thêm bid mới vào mảng bids hiện tại
            // product.bids.push(newBid._id);

            // // Lưu sản phẩm đã cập nhật
            // await product.save();

            // await Products.findByIdAndUpdate(req.body.productId, {
            //     bids: [...req.body.bids, newBid._id],
            //     bidPriceMax: req.body.price > req.body.bidPriceMax ? req.body.price : req.body.bidPriceMax,
            // });

            const newBid = await bid.create(req.body);
            await Products.findByIdAndUpdate(
                req.body.productId,
                {
                    bids: [...req.body.bids, newBid._id],
                    bidPriceMax: req.body.price > req.body.bidPriceMax ? req.body.price : req.body.bidPriceMax,
                },
                { new: true }
            );

            // Gửi phản hồi thành công
            res.status(201).json({
                message: "Create Bid Successful",
                data: newBid,
            });
        } catch (error) {
            // Sử dụng middleware lỗi
            next(error);
        }
    }
    // Update Bids
    async updateBids(req, body) {
        try {
            const bids = await bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!bids) {
                return res.status(404).json({
                    message: "Not found",
                });
            }
            res.status(200).json({
                message: "Get detail Successful",
                data: bids,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default new BidsController();
