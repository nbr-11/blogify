import zod from 'zod';
export declare const passwordSchema: zod.ZodString;
export declare const signUpSchema: zod.ZodObject<{
    firstName: zod.ZodString;
    lastName: zod.ZodOptional<zod.ZodString>;
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    firstName: string;
    email: string;
    password: string;
    lastName?: string | undefined;
}, {
    firstName: string;
    email: string;
    password: string;
    lastName?: string | undefined;
}>;
export declare const signInSchema: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const postBlogSchema: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogSchema: zod.ZodObject<{
    title: zod.ZodOptional<zod.ZodString>;
    content: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
}>;
export type SignUpType = zod.infer<typeof signUpSchema>;
export type SignInType = zod.infer<typeof signInSchema>;
export type PostBlogType = zod.infer<typeof postBlogSchema>;
export type UpdateBlogType = zod.infer<typeof updateBlogSchema>;
