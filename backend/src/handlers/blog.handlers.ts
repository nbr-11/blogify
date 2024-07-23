import { createFactory } from "hono/factory";
import { ENV } from "..";
import { isAuth } from "../middlewares/authentication";
import { PrismaClient } from "@prisma/client";
import { publicMiddleware } from "../middlewares/public";
import { 
    postBlogSchema,
    updateBlogSchema
 } from "@nbr11/blogify-common";

const factory  = createFactory<ENV>();

export const postBlogHandler = factory!.createHandlers(isAuth, async(c)=>{
    try{

        const prisma = c.get('prisma');
        const body = await c.req.json();
        const authorId = c.get('id');

        const {success} = postBlogSchema.safeParse(body);

        if(!success){
            return c 
                .json({
                    "message":"Bad inputs"
                },
                400
            )
        }
        
        const postInDb = await prisma.post.create({
            data:{
                title:body.title,
                authorId: authorId,
                content: body.content,
                published: body.published || false
            }
        });

        return c 
            .json({
                "message":"Blog post has been created successfully",
                "blogId":postInDb.id
            },
            200
        )

    } catch(e){
        return c 
            .json({
                "message":"Something went wrong"
            },
            500
        )
    }
});

export const putBlogHandler = factory!.createHandlers(isAuth, async(c)=>{
    try{

        const prisma = c.get('prisma') as PrismaClient;
        const body = await c.req.json();
        const authorId = c.get('id');
        const blogId = c.req.param('id');

        const {success} = updateBlogSchema.safeParse(body);

        if(!success){
            return c 
                .json({
                    "message":"Bad inputs"
                },
                400
            )
        }
        //here we will only allow the updation of title and content

        const toUpdateData = {
            ...(body.title?{title:body.title}:{}),
            ...(body.content?{content:body.content}:{})
        }

        await prisma.post.update({
            where:{
                id:blogId,
                authorId:authorId
            },
            data:toUpdateData
        });


        return c
            .json({
                "message":"Blog post updated successfully"
            },
            200
        )
        
    } catch(e){
        return c 
            .json({
                "message":"Something went wrong"
            },
            500
        )
    }
});


export const togglePublishesHandler = factory!.createHandlers(isAuth, async(c)=>{
    try{

        
        const blogId = c.req.param('id');
        const authorId = c.get('id');
        const prisma = c.get('prisma') as PrismaClient;

        const blogInDB = await prisma.post.findFirst({
            where:{
                id:blogId
            }
        });

        const updatedBlogInDB = await prisma.post.update({
            where:{
                id:blogId,
                authorId:authorId
            },
            data:{
                published:!(blogInDB?.published)
            }
        })


        return c
            .json({
                "message":"published status successfully toggeled"
            },
            200
        )


    } catch(e){
        return c 
            .json({
                "message":"Something went wrong"
            }, 
            500
        )
    }
})

export const getBlogHandler  = factory!.createHandlers(publicMiddleware, async(c)=>{
    try{

        const prisma = c.get('prisma') as PrismaClient;
        const blogId = c.req.param('id');
        const authorId = c.get('id');

        const blogInDb = await prisma.post.findFirst({
            where:{
                
                OR:[
                    {
                        id:blogId,
                        published:true,
                    },
                    {
                        authorId:authorId
                    }
                ]
            }
        });

        return c
            .json({
                blog:blogInDb
            },
            200
        )

    } catch(e){
        return c 
            .json({
                "message":"Something went wrong"
            })
    }
});


//in this route we might add pagination
export const getBulkBlogHandler = factory!.createHandlers(publicMiddleware, async(c)=>{
    try{
        const prisma = c.get('prisma') as PrismaClient;
        const authorId = c.get('id');
        const blogs = await prisma.post.findMany({
            where:{
                OR:[
                    {
                        published:true,
                    },
                    {
                        authorId:authorId
                    }
                ]
            }
        });

        return c
            .json({
                blogs
            },
            200
        )

    } catch(e){
        return c
            .json({
                "message":"Something went wrong"
            },
            500 
        )
    }
});


export const deleteBlogPost = factory!.createHandlers(isAuth, async(c)=>{
    try{
        
        const blogId = c.req.param('id');
        const prisma = c.get('prisma') as PrismaClient;
        const authorId = c.get('id');

        const deletedBlog = await prisma.post.delete({
            where:{
                id:blogId,
                authorId:authorId
            }
        });

        return c
            .json({
                "message":"Blog deleted successfully",
                blog:deletedBlog
            },
            200
        )

    } catch(e){
        return c 
            .json({
                "message":"Something went wrong while deleting the blog"
            },
            500
        )
    }
});

