import zod from 'zod';


export const passwordSchema = zod.string()
                        .min(8,{message:"The password's minimum length must be 8"})
                        .regex(/[a-z]/,{message:"The password must contain at least one smallcase character"})
                        .regex(/[A-Z]/,{message:"The password must contain at least on UpperCase character"})
                        .regex(/[0-9]/,{message:"The password must contain at least one number"})
                        .regex(/[^a-zA-z0-9]/,{message:"The password must contain at least one special character"});

                        
export const signUpSchema = zod.object({
    firstName:zod.string(),
    lastName:zod.string().optional(),
    email:zod.string().email({message:"The email is invalid"}),
    password:passwordSchema
});

export const signInSchema = zod.object({
    email:zod.string().email({message:"The email is invalid"}),
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