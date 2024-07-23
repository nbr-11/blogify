"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.postBlogSchema = exports.signInSchema = exports.signUpSchema = exports.passwordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.passwordSchema = zod_1.default.string()
    .min(8, { message: "The password must be of minimum 8 length" })
    .regex(/[a-z]/, { message: "It must contain at least one smallcase character" })
    .regex(/[A-Z]/, { message: "It must contain at least on UpperCase character" })
    .regex(/^[a-zA-z0-9]/, { message: "must contain at least one special character" });
//signup types and schema
exports.signUpSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: exports.passwordSchema
});
//signin schema
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: exports.passwordSchema
});
//create blog
exports.postBlogSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
//update a blog
exports.updateBlogSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
});
