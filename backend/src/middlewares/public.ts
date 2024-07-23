import { createFactory } from "hono/factory";
import { ENV } from "..";
import { getSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";

const factory = createFactory<ENV>();

export const publicMiddleware = factory.createMiddleware(async(c,next)=>{
    try{

        const token = await getSignedCookie(c, c.env.COOKIE_SECRET, 'token');

        if(token){

            const payload = await verify(token, c.env.JWT_SECRET);
            c.set('id',payload.id as string);

        } 

        await next();

    } catch(e){
        return c
            .json({
                "message":"Something went wrong"
            })
    }
})