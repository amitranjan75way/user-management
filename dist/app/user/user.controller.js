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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.resetUserPassword = exports.createUser = exports.logout = exports.loginUser = exports.registerUser = void 0;
const userService = __importStar(require("./user.service"));
const response_hepler_1 = require("../common/helper/response.hepler");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const jwt_helper_1 = require("../common/helper/jwt.helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_service_1 = require("../common/services/email.service");
const mail_template_1 = require("../common/template/mail.template");
const jwthelper = __importStar(require("../common/helper/jwt.helper"));
const config_hepler_1 = require("../common/helper/config.hepler");
(0, config_hepler_1.loadConfig)();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const userEmail = data.email;
    const isUserExist = yield userService.isUserExistByEamil(userEmail);
    if (isUserExist) {
        throw (0, http_errors_1.default)(409, "User already Exits");
    }
    const result = yield userService.createUser(data);
    const payload = {
        id: result._id,
        name: result.name,
        email: result.email,
        role: result.role
    };
    const { refreshToken, accessToken } = (0, jwt_helper_1.generateTokens)(payload);
    const user = yield userService.updateRefreshToken(result._id, refreshToken);
    if (!user) {
        throw (0, http_errors_1.default)(500, "Failed to update refresh token");
    }
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.send((0, response_hepler_1.createResponse)(user, "User Registered Successfully"));
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let user = yield userService.findUserByEmail(data.email);
    if (!user) {
        throw (0, http_errors_1.default)(404, "User not found");
    }
    if (yield bcrypt_1.default.compare(data.password, user.password)) {
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        const { refreshToken, accessToken } = (0, jwt_helper_1.generateTokens)(payload);
        const updatedUser = yield userService.updateRefreshToken(user._id, refreshToken);
        if (!updatedUser) {
            throw (0, http_errors_1.default)(500, "Failed to update refresh token");
        }
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        user.password = '';
        user.refreshToken = '';
        res.send((0, response_hepler_1.createResponse)({ user, accessToken }, "User logged in successfully"));
    }
    else {
        throw (0, http_errors_1.default)(401, "wrong password | Unauthorised access");
    }
}));
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.user.id; // Assuming req.user contains the authenticated user's information
    // const user = await userService.deleteRefreshToken(userId);
    // if (!user) {
    //     throw createHttpError(500, "Failed to delete refresh token");
    // }
    res.clearCookie('accessToken');
    res.send((0, response_hepler_1.createResponse)(null, "User logged out successfully"));
}));
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const isUserExist = yield userService.isUserExistByEamil(data.email);
    if (isUserExist) {
        throw (0, http_errors_1.default)(409, "User already Exits");
    }
    const user = yield userService.addUserByAdmin(data);
    const { accessToken, refreshToken } = (0, jwt_helper_1.generateTokens)(data);
    const mailOptions = {
        from: `Amit Ranjan`,
        to: `${user.email}`,
        subject: `Password Reset`,
        html: `${(0, mail_template_1.resetPasswordEmailTemplate)(accessToken)}`
    };
    yield (0, email_service_1.sendEmail)(mailOptions);
    res.send((0, response_hepler_1.createResponse)({}, "User created and sent mail successfully"));
}));
exports.resetUserPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const link = data.resetLink;
    const url = new URL(link);
    const token = (url).searchParams.get("token");
    const isTokenValid = jwthelper.validateToken(token, ACCESS_TOKEN_SECRET);
    const user = yield userService.resetPassword(isTokenValid.decoded.email, data.newPassword);
    res.send((0, response_hepler_1.createResponse)(user, "password reset succesfully"));
}));
