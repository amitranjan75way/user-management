"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_hepler_1 = require("./config.hepler");
(0, config_hepler_1.loadConfig)();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = '1h'; // 60 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const validateToken = (token, secret) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return { valid: true, decoded };
    }
    catch (error) {
        return { valid: false, error };
    }
};
exports.validateToken = validateToken;
// export const updateAccessToken = (refreshToken: string) => {
//   try {
//     const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as Payload;
//     const newAccessToken = jwt.sign({ userId: decoded.userId, email: decoded.email }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
//     return { valid: true, newAccessToken };
//   } catch (error) {
//     return { valid: false, error };
//   }
// };
