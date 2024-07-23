import zod from 'zod';


export const passwordSchema = zod.string()
                        .min(8,{message:"The password must be of minimum 8 length"})
                        .regex(/[a-z]/,{message:"It must contain at least one smallcase character"})
                        .regex(/[A-Z]/,{message:"It must contain at least on UpperCase character"})
                        .regex(/^[a-zA-z0-9]/,{message:"must contain at least one special character"});

                        
export const signUpSchema = zod.object({
    email:zod.string().email(),
    password:passwordSchema
});

export const signInSchema = zod.object({
    email:zod.string().email(),
    password:passwordSchema
});

export const postBlogSchema = zod.object({
    title:zod.string(),
    content:zod.string()
});

export const updateBlogSchema = zod.object({
    title:zod.string().optional(),
    content:zod.string().optional(),
})


export type SignUpType = zod.infer<typeof signUpSchema>
export type SignInType = zod.infer<typeof signInSchema>
export type PostBlogType = zod.infer<typeof postBlogSchema>
export type UpdateBlogType = zod.infer<typeof updateBlogSchema>