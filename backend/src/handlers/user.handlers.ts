import { PrismaClient } from "@prisma/client";
import { sign } from 'hono/jwt';
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import {
    generateSalt,
    uint8ArrayToBase64,
    base64ToUnit8Array,
    hashPassword
} from "../utils/passwordUtils"
import { createFactory } from "hono/factory";
import { ENV } from "../index";
import { isAuth } from "../middlewares/authentication";

const factory = createFactory<ENV>()

export const signupHanlder = factory!.createHandlers(async (c) => {
    try {

        const prisma = c.get('prisma') as PrismaClient
        const body = await c.req.json();

        //checking if the email is already in use
        const userInDb = await prisma.user.findFirst({
            where: {
                email: body.email
            },
            select: {
                id: true
            }
        });

        if (userInDb) {
            return c
                .json({
                    "message": "User already exists/email already in use"
                },
                    409
                )
        }

        //hash the password
        const salt = generateSalt(10);
        const userSaltBase64 = uint8ArrayToBase64(salt); //to store in DB

        const hashedPassword = await hashPassword(body.password, salt);
        const hashedPasswordBase64 = uint8ArrayToBase64(hashedPassword); //to store in DB

        const user = await prisma.user.create({
            data: {
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName || "",
                salt: userSaltBase64,
                password: hashedPasswordBase64,
            },
            select: {
                id: true
            }
        });

        //creating a jwt token
        const payload = {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
        }
        const token = await sign(payload, c.env.JWT_SECRET);

        //set a signed cookie on c
        await setSignedCookie(c, "token", token, c.env.COOKIE_SECRET, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            secure: true,
            httpOnly: true,
        });

        //return a response
        return c.json({
            "message": "user signed up"
        },
            200);

    } catch (e) {
        return c
            .json({
                "message": "Something went wrong"
            },
                500
            )
    }
});

export const signinHandler = factory!.createHandlers(async (c) => {
    try {

        const prisma = c.get('prisma') as PrismaClient;
        const body = await c.req.json();

        //check if the user exists in the database

        const userInDb = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if (!userInDb) {
            return c
                .json({
                    "message": "user does not exists"
                },
                    400
                )
        }

        //if the user is here it means he/she is a genuine user and needs to be authenticated

        const salt = base64ToUnit8Array(userInDb.salt);
        const hashedPasswordCheck = await hashPassword(body.password, salt);
        const hashedPasswordCheckBase64 = uint8ArrayToBase64(hashedPasswordCheck);

        if (hashedPasswordCheckBase64 !== userInDb.password) {
            return c
                .json({
                    "message": "Invalid email or password"
                },
                    403
                )
        }

        //if my user is here it means he is authenticated
        //generate token

        const payload = {
            id: userInDb.id,
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
        }

        const token = await sign(payload, c.env.JWT_SECRET);

        //set a signed cookie
        await setSignedCookie(c, "token", token, c.env.COOKIE_SECRET, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            secure: true,
            httpOnly: true
        });

        //send a successfull response

        return c
            .json({
                "message": "User signedin successfully"
            },
                200
            );

    } catch (e) {
        return c
            .json({
                "message": "Something went wrong"
            },
                500
            )
    }
});

export const logoutHandler = factory!.createHandlers(isAuth, async (c) => {
    try {

        deleteCookie(c, 'token', {
            httpOnly: true,
            secure: true
        });

        return c
            .json({
                "message": "user logged out successfully"
            },
                200
            )

    } catch (e) {
        return c
            .json({
                "message": "Something went wrong"
            },
                500
            )
    }
});

export const deleteUserAccount = factory!.createHandlers(isAuth, async (c) => {
    try {

        const prisma = c.get('prisma') as PrismaClient;
        const userId = c.get('id');

        //delete all posts

        const deleteUserPosts = prisma.post.deleteMany({
            where: {
                authorId: userId
            }
        });

        //delete the user

        const deleteUser = prisma.user.delete({
            where: {
                id: userId
            }
        })

        //add them in a transaction

        await prisma.$transaction([deleteUserPosts, deleteUser]);

        //delete the cookie

        deleteCookie(c, 'token', {
            httpOnly: true,
            secure: true,
        });

        return c
            .json({
                "message": "Your account has been deleted successfully"
            },
                200
            );



    } catch (e) {
        return c
            .json({
                message: "Something went wrong while deleting you account"
            },
                500
            )
    }
});


export const meHandler = factory!.createHandlers(isAuth,async(c)=>{
    try{

        const prisma = c.get('prisma') as PrismaClient;
        const id = c.get('id');

        const userInDb = await prisma.user.findFirst({
            where:{
                id:id
            },
            select:{
                id:true,
                firstName:true,
                lastName:true,
                email:true,
                posts:true,
                password:false
            }
        });

        return c.
            json({
                "user":userInDb,
                "isLoggedin":true
            },
            200
        )


    } catch(e){
        return c
            .json({
                "message":'Something went wrong',
                "isLoggedin":false
            },
            500
        )
    }
});