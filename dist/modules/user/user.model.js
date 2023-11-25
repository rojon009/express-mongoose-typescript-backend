"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    city: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    country: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
});
const productSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product Name is required!'],
        trim: true,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Product Price is required!'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product Quantity is required!'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'userId is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        maxlength: [20, "username can't be more than 20 character"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [20, 'Max length of the passowd is 20'],
        trim: true,
    },
    fullName: {
        type: fullNameSchema,
        required: [true, 'Need to provide the name'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    hobbies: [
        {
            type: String,
        },
    ],
    address: {
        type: addressSchema,
        required: [true, 'Address is required'],
    },
    orders: [
        {
            type: productSchema,
        },
    ],
});
userSchema.static('isUserExists', function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ userId });
        return user;
    });
});
exports.User = (0, mongoose_1.model)('User', userSchema);
