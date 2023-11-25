"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** External Imports */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
/** Internal Imports */
const index_1 = __importDefault(require("./router/index"));
const helper_1 = require("./utils/helper");
// app initialization
const app = (0, express_1.default)();
/** Middleware */
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api', index_1.default);
// Homepage
app.get('/', (req, res) => {
    res.send('<h3 style="margin-top: 50px; text-align: center">Goto <br/> <a href="/api-docs">API DOCS</a><br/>for API documentation</h3>');
});
app.use((err, req, res, next) => {
    (0, helper_1.errorResponse)(res, 500, err.message);
});
exports.default = app;
