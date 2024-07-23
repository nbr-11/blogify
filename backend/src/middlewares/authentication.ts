import { createFactory } from "hono/factory";
import { ENV } from "..";
import { getSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";

const factory = createFactory<ENV>();

export const isAuth = factory!.createMiddleware(async (c, next)=>{
    try{

        const token = await getSignedCookie(c, c.env.COOKIE_SECRET, 'token');

        if(!token){
            return c
                .json({
                    "message":"Token not found"
                },
                403
            )
        }

        const decodedPayload = await verify(token,c.env.JWT_SECRET);
        c.set('id',decodedPayload.id as string);
        await next();

    } catch(e){
        return c 
            .json({
                "message":'You are not logged in',
                "isLoggedin":false
            },
            403
        );
    }
});

