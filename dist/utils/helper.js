"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, statusCode, message, data) => {
    const response = {
        success: true,
        message,
        data,
    };
    res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
const errorResponse = (res, statusCode, message) => {
    const response = {
        success: false,
        message: message,
        error: {
            code: statusCode,
            description: message,
        },
    };
    res.status(statusCode).json(response);
};
exports.errorResponse = errorResponse;
