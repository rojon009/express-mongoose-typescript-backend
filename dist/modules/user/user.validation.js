"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const fullNameSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().max(50),
    lastName: joi_1.default.string().required().max(50),
});
const addressSchema = joi_1.default.object({
    street: joi_1.default.string().max(50).required(),
    city: joi_1.default.string().max(50).required(),
    country: joi_1.default.string().max(50).required(),
});
exports.productValidationSchema = joi_1.default.object({
    productName: joi_1.default.string().required().max(50),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().integer().required(),
});
const userValidationSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    username: joi_1.default.string()
        .required()
        .min(3)
        .max(20)
        .message('At least need 3 character'),
    password: joi_1.default.string().required().max(20),
    fullName: fullNameSchema.required(),
    age: joi_1.default.number().required(),
    email: joi_1.default.string().email().max(250).required(),
    isActive: joi_1.default.boolean().valid(true, false).default(true).required(),
    hobbies: joi_1.default.array().items(joi_1.default.string()),
    address: addressSchema.required(),
});
exports.default = userValidationSchema;
