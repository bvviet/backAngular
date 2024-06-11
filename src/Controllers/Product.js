import Products from "../Models/product.js";

class productController {
    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 6;
            const skip = (page - 1) * limit;

            const products = await Products.find().skip(skip).limit(limit).populate("category");
            const total = await Products.countDocuments();

            res.status(200).json({
                message: "success",
                data: products,
                pagination: {
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                },
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    async getDetail(req, res) {
        try {
            const product = await Products.findById(req.params.id)
                .populate("category")
                .populate({
                    path: "bids",
                    populate: {
                        path: "userId",
                        select: "useName email",
                    },
                });
            if (!product) {
                return res.status(404).json({
                    message: "Not found",
                });
            }
            res.status(200).json({
                message: "success",
                data: product,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    async post(req, res) {
        try {
            const endAtTime = new Date(req.body.startAt).getTime() + req.body.bidTime * 60 * 1000;
            const product = await Products.create({ ...req.body, endAt: new Date(endAtTime) });
            res.status(200).json({
                message: "success",
                data: product,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    async put(req, res) {
        try {
            const endAtTime = new Date(req.body.startAt).getTime() + req.body.bidTime * 60 * 1000;
            const product = await Products.findByIdAndUpdate(
                req.params.id,
                { ...req.body, endAt: new Date(endAtTime) },
                { new: true }
            );
            if (!product) {
                return res.status(404).json({
                    message: "Not found",
                });
            }
            res.status(200).json({
                message: "success",
                data: product,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    async delete(req, res) {
        try {
            const product = await Products.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({
                    message: "Not found",
                });
            }
            res.status(200).json({
                message: "Delete successful",
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    async search(req, res) {
        try {
            const { q, page = 1, limit = 6 } = req.query;
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);
            const skip = (pageNumber - 1) * limitNumber;

            const searchQuery = {
                $or: [{ title: { $regex: q, $options: "i" } }],
            };

            const products = await Products.find(searchQuery).skip(skip).limit(limitNumber);
            const total = await Products.countDocuments(searchQuery);

            res.status(200).json({
                message: "success",
                data: products,
                pagination: {
                    page: pageNumber,
                    limit: limitNumber,
                    totalPages: Math.ceil(total / limitNumber),
                    totalItems: total,
                },
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
}

export default new productController();
