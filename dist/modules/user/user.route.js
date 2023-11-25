"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.UserController.createUser);
router.get('/', user_controller_1.UserController.getAllUsers);
router.get('/:userId', user_controller_1.UserController.getUserByUserId);
router.put('/:userId', user_controller_1.UserController.updateUserByUserId);
router.delete('/:userId', user_controller_1.UserController.deleteUserByUserId);
router.put('/:userId/orders', user_controller_1.UserController.addNewProductToOrders);
router.get('/:userId/orders', user_controller_1.UserController.getUserOrders);
router.get('/:userId/orders', user_controller_1.UserController.getUserOrderTotal);
router.get('/:userId/orders/total-price', user_controller_1.UserController.getUserOrderTotal);
exports.default = router;
