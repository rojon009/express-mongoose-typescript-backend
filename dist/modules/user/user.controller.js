"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserController = void 0;
const user_validation_1 = __importStar(require("./user.validation"));
const helper_1 = require("../../utils/helper");
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { user: userData } = req.body;
        if (yield user_model_1.User.isUserExists(userData.userId)) {
            throw new Error('User already Exist with this UserId');
        }
        const validatedUserData = user_validation_1.default.validate(userData);
        if (validatedUserData.error) {
            (0, helper_1.errorResponse)(res, 422, (_a = validatedUserData.error) === null || _a === void 0 ? void 0 : _a.message);
        }
        const result = yield user_service_1.UserService.createUserIntoDB(validatedUserData.value);
        (0, helper_1.successResponse)(res, 201, 'User created successfully!', result);
    }
    catch (err) {
        next(err.message);
    }
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield user_service_1.UserService.getAllUsersFromDB();
        if (!results.length) {
            (0, helper_1.successResponse)(res, 200, 'No users found in DB', results);
        }
        (0, helper_1.successResponse)(res, 200, 'Users fetched successfully!', results);
    }
    catch (err) {
        next(err.message);
    }
});
const getUserByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!(yield user_model_1.User.isUserExists(Number(userId)))) {
            (0, helper_1.errorResponse)(res, 404, 'User not found');
        }
        const result = yield user_service_1.UserService.getUserByUserIdFromDB(Number(userId));
        (0, helper_1.successResponse)(res, 200, 'User fetched successfully!', result);
    }
    catch (err) {
        next(err.message);
    }
});
const deleteUserByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!(yield user_model_1.User.isUserExists(Number(userId)))) {
            (0, helper_1.errorResponse)(res, 404, 'User not found');
        }
        yield user_service_1.UserService.deleteUserByUserIdFromDB(Number(userId));
        (0, helper_1.successResponse)(res, 200, 'User deleted successfully!', null);
    }
    catch (err) {
        next(err.message);
    }
});
const updateUserByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { userId } = req.params;
        const { user: userData } = req.body;
        if (!(yield user_model_1.User.isUserExists(Number(userId)))) {
            (0, helper_1.errorResponse)(res, 404, 'User not found');
        }
        const validatedUserData = user_validation_1.default.validate(userData);
        if (validatedUserData.error) {
            (0, helper_1.errorResponse)(res, 422, (_b = validatedUserData.error) === null || _b === void 0 ? void 0 : _b.message);
        }
        const result = yield user_service_1.UserService.updateUserByUserId(Number(userId), userData);
        (0, helper_1.successResponse)(res, 200, 'User updated successfully!', result);
    }
    catch (err) {
        next(err.message);
    }
});
const addNewProductToOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { userId } = req.params;
        const productData = req.body;
        if (!(yield user_model_1.User.isUserExists(Number(userId)))) {
            (0, helper_1.errorResponse)(res, 404, 'User not found');
        }
        const validatedProductData = user_validation_1.productValidationSchema.validate(productData);
        if (validatedProductData.error) {
            (0, helper_1.errorResponse)(res, 422, (_c = validatedProductData.error) === null || _c === void 0 ? void 0 : _c.message);
        }
        yield user_service_1.UserService.addNewProductInOrder(Number(userId), validatedProductData.value);
        (0, helper_1.successResponse)(res, 200, 'Order created successfully!', null);
    }
    catch (err) {
        next(err.message);
    }
});
const getUserOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!(yield user_model_1.User.isUserExists(Number(userId)))) {
            (0, helper_1.errorResponse)(res, 404, 'User not found');
        }
        const result = yield user_service_1.UserService.getUserOrders(Number(userId));
        (0, helper_1.successResponse)(res, 200, 'Order fetched successfully!', result);
    }
    catch (err) {
        next(err.message);
    }
});
const getUserOrderTotal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!(yield user_model_1.User.isUserExists(Number(userId)))) {
            (0, helper_1.errorResponse)(res, 404, 'User not found');
        }
        const result = (yield user_service_1.UserService.getUserOrderTotal(Number(userId)));
        if (!result || !result.length) {
            (0, helper_1.errorResponse)(res, 404, 'No Order has been found for this User!');
            return;
        }
        const { totalPrice } = result === null || result === void 0 ? void 0 : result[0];
        (0, helper_1.successResponse)(res, 200, 'Total price calculated successfully!', {
            totalPrice,
        });
    }
    catch (err) {
        next(err.message);
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getUserByUserId,
    updateUserByUserId,
    deleteUserByUserId,
    addNewProductToOrders,
    getUserOrders,
    getUserOrderTotal,
};
