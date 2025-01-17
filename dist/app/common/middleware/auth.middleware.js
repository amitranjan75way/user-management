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
exports.auth = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const config_hepler_1 = require("../helper/config.hepler");
const response_hepler_1 = require("../helper/response.hepler");
const jwt_helper_1 = require("../helper/jwt.helper");
(0, config_hepler_1.loadConfig)();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
// todo : make this function fully functional 
exports.auth = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.accessToken || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
    if (!token || token === undefined) {
        throw (0, http_errors_1.default)(401, "Auth: token is missing");
    }
    const { valid, decoded } = (0, jwt_helper_1.validateToken)(token, ACCESS_TOKEN_SECRET);
    // req.user = decoded as Payload;
    console.log(decoded);
    res.send((0, response_hepler_1.createResponse)(decoded, "user verified successfully"));
}));
