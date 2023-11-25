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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield user_model_1.User.find();
    return results;
});
const getUserByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield user_model_1.User.findOne({ userId });
    return results;
});
const deleteUserByUserIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield user_model_1.User.findOneAndDelete({ userId });
    return results;
});
const updateUserByUserId = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, Object.assign({}, userData));
    return result;
});
const addNewProductInOrder = (userId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, { $push: { orders: productData } });
    return result;
});
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId });
    return { orders: result === null || result === void 0 ? void 0 : result.orders };
});
const getUserOrderTotal = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        {
            $match: {
                userId: userId,
            },
        },
        {
            $unwind: '$orders',
        },
        {
            $project: {
                _id: 0,
                orderTotal: {
                    $multiply: ['$orders.price', '$orders.quantity'],
                },
            },
        },
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: '$orderTotal',
                },
            },
        },
    ]);
    return result;
});
exports.UserService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByUserIdFromDB,
    updateUserByUserId,
    deleteUserByUserIdFromDB,
    addNewProductInOrder,
    getUserOrders,
    getUserOrderTotal,
};
