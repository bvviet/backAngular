import authentication from "../Models/auth.js";
import { registerValidator } from "../validator/auth.js";
import { loginValidator } from "../validator/auth.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class authController {
    // Get all user
    async getAll(req, res) {
        try {
            const auth = await authentication.find();
            res.status(200).json({
                message: "Lấy thành công",
                data: auth,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    // Register
    async register(req, res) {
        try {
            const { useName, email, password, role } = req.body;
            // Validate
            const { error } = registerValidator.validate(req.body);
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(400).json({
                    message: errors,
                });
            }
            // Check mail
            const checkEmail = await authentication.findOne({ email });
            if (checkEmail) {
                return res.status(404).json({
                    message: "Email đã được đăng ký!",
                });
            }
            // Mã hóa password
            const hashPassword = await bcryptjs.hash(password, 8);
            // Đăng ký
            const auth = await authentication.create({
                useName,
                email,
                password: hashPassword,
                role,
            });
            // Ẩn mật khẩu
            res.status(200).json({
                message: "Đăng ký thành công",
                data: { ...auth.toObject(), password: undefined },
            });
        } catch (error) {
            res.status(500).json({
                message: "Xảy ra lỗi khi đăng ký",
                error: error.message,
            });
        }
    }

    async login(req, res) {
        try {
            const { useName, email, password } = req.body;
            // Validate
            const { error } = loginValidator.validate({ email, password });
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(400).json({
                    errors,
                });
            }
            // Check email
            const checkEmail = await authentication.findOne({ email });
            if (!checkEmail) {
                return res.status(404).json({
                    message: "Email chưa được đăng ký",
                });
            }
            // So sanh password
            const checkPassword = bcryptjs.compareSync(password, checkEmail.password);
            if (!checkPassword) {
                return res.status(400).json({
                    message: "Mật khẩu không đúng",
                });
            }
            // Crate token
            const token = jwt.sign({ id: checkEmail._id }, "token", { expiresIn: "1h" });
            // Login
            res.status(200).json({
                message: "Đăng nhập thành công",
                data: { ...checkEmail.toObject(), password: undefined },
                token,
            });
        } catch (error) {
            res.status(500).json({
                message: "Xảy ra lỗi khi đăng nhập",
            });
        }
    }
}

export default new authController();
