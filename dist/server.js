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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/** External Imports */
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
/** Internal Imports */
const app_1 = __importDefault(require("./app"));
/** dotenv config init */
dotenv_1.default.config();
const { PORT, DB_URI } = process.env;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(DB_URI);
        app_1.default.listen(PORT, () => {
            console.log('\x1b[34m%s\x1b[0m', `Server is up and running on http://localhost:${PORT}`);
        });
    });
}
main().catch(err => {
    console.error(err);
});
