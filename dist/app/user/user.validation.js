"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = exports.createUser = exports.loginUser = exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
exports.registerUser = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string'),
];
exports.loginUser = [
    (0, express_validator_1.body)('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string')
];
exports.createUser = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
];
exports.resetUserPassword = [
    (0, express_validator_1.body)('resetLink').notEmpty().withMessage('reset link is required').isString().withMessage('reset link must be a string'),
    (0, express_validator_1.body)('newPassword').notEmpty().withMessage('New password is required').isString().withMessage('New password must be a string'),
];
