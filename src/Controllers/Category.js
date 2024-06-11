import category from "../Models/category.js";

class categoryController {
    async getAll(req, res) {
        const categories = await category.find();
        res.status(200).json({
            message: "Ok",
            data: categories,
        });
    }

    async post(req, res) {
        try {
            const categories = await category.create(req.body);
            res.status(200).json({
                message: "Ok",
                data: categories,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
}

export default new categoryController();
