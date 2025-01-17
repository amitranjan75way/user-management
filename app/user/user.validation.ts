
import { body } from 'express-validator';
import { query } from 'express-validator';

export const registerUser = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    body('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string'),
];

export const loginUser = [
    body('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    body('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string')
];

export const createUser = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
];

export const resetUserPassword = [
    body('resetLink').notEmpty().withMessage('reset link is required').isString().withMessage('reset link must be a string'),
    body('newPassword').notEmpty().withMessage('New password is required').isString().withMessage('New password must be a string'),
];

export const getUsersByDateRange = [
    query('startDate').optional().isISO8601().withMessage('startDate must be a valid ISO 8601 date'),
    query('endDate').optional().isISO8601().withMessage('endDate must be a valid ISO 8601 date')
];


