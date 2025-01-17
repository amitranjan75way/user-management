"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_json_1 = __importDefault(require("./userRoute.json"));
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Express API Documentation",
        version: "1.0.0",
        description: "API documentation for the Express project",
        contact: {
            email: "iamakr.dev@gmail.com",
        },
    },
    servers: [
        {
            url: "http://localhost:4000/api",
            description: "Development server",
        },
    ],
    paths: Object.assign({}, userRoute_json_1.default),
};
exports.default = swaggerDocument;
