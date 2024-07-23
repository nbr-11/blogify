import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createFactory } from "hono/factory";
import { ENV } from "..";


const factory = createFactory<ENV>()

export const injectPrisma  = factory.createMiddleware(async (c, next)=>{
    try{

        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate());

        c.set('prisma', prisma);

        await next();

    } catch(e){
        return c 
            .json({
                "message":"something went wrong"
            },
            500
        )
    }
});

