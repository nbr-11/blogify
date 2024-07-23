"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.postBlogSchema = exports.signInSchema = exports.signUpSchema = exports.passwordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.passwordSchema = zod_1.default.string()
    .min(8, { message: "The password's minimum length must be 8" })
    .regex(/[a-z]/, { message: "The password must contain at least one smallcase character" })
    .regex(/[A-Z]/, { message: "The password must contain at least on UpperCase character" })
    .regex(/[0-9]/, { message: "The password must contain at least one number" })
    .regex(/[^a-zA-z0-9]/, { message: "The password must contain at least one special character" });
exports.signUpSchema = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string().optional(),
    email: zod_1.default.string().email({ message: "The email is invalid" }),
    password: exports.passwordSchema
});
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "The email is invalid" }),
    password: exports.passwordSchema
});
exports.postBlogSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updateBlogSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
});
