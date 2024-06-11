import Joi from "joi";

const registerValidator = Joi.object({
    useName: Joi.string().required().messages({
        "string.base": `"Tên người dùng" phải là một chuỗi`,
        "string.empty": `"Tên người dùng" không được để trống`,
        "any.required": `"Tên người dùng" là bắt buộc`,
    }),
    email: Joi.string().email().required().messages({
        "string.base": `"Email" phải là một chuỗi`,
        "string.email": `"Email" phải là một địa chỉ email hợp lệ`,
        "string.empty": `"Email" không được để trống`,
        "any.required": `"Email" là bắt buộc`,
    }),
    password: Joi.string().required().messages({
        "string.base": `"Mật khẩu" phải là một chuỗi`,
        "string.empty": `"Mật khẩu" không được để trống`,
        "any.required": `"Mật khẩu" là bắt buộc`,
    }),
    role: Joi.string(),
}).options({
    abortEarly: false,
});

const loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": `"Email" phải là một chuỗi`,
        "string.email": `"Email" phải là một địa chỉ email hợp lệ`,
        "string.empty": `"Email" không được để trống`,
        "any.required": `"Email" là bắt buộc`,
    }),
    password: Joi.string().messages({
        "string.base": `"Mật khẩu" phải là một chuỗi`,
        "string.empty": `"Mật khẩu" không được để trống`,
        "any.required": `"Mật khẩu" là bắt buộc`,
    }),
}).options({
    abortEarly: false,
});

export { registerValidator, loginValidator };
