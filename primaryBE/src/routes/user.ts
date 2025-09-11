import express from 'express'
import { JWT_SECRET } from '../config';
import { authMiddleware  } from '../middleware'
import { Router } from 'express';
import { SigninSchema,  SignupSchema } from '../types';
import { prisma } from '../db'
import jwt from "jsonwebtoken"

const router = Router();


router.post('/signup', async  (req , res)  => {
    console.log("this is the signup.handler")
    const body = req.body;
    const parsedBody  = SignupSchema.safeParse(body);

    if (!parsedBody.success) return res.status(411).send("Invalid arguments")

//check if the user dosent already exists
const userexists = await prisma.user.findMany({
    where : {
        email : parsedBody.data.email,
    }
})
if (userexists) return res.status(403).send("user already exists")


    const user = await prisma.user.create({
        data : {
            name : parsedBody.data.name,
            email: parsedBody.data.email,
            password: parsedBody.data.password
        }
    })
   //send email to verify the email

    return res.status(201).send("user created")

})

router.post('/signin', async (req, res) =>  {
    console.log("This is a sign in handler")
    const body = req.body;
    const parsedBody  = SigninSchema.safeParse(body);

    if (!parsedBody.success) return res.status(411).send(`incorrect input types ${parsedBody.error}`)

    const user = await prisma.user.findFirst({
        where : {
            email : parsedBody.data?.email
        }
    })
    if (!user) return res.status(411).send(" THe user is not egistered")
 
    const token = jwt.sign({
        id : user?.id

    }, JWT_SECRET) 
    
    res.status(201).json({
        token :token
    })
})

router.get('/user', authMiddleware,async (req, res)=> {
    console.log("this is a get user handler")
    //@ts-ignore
    const id = req?.id

    const user = await prisma.user.findFirst({
        where : {
            id : id
        },
        select :{ // only send these details select 
            name: true,
            email : true
        }
    })
    res.status(200).json({
        user : user
    })
})

export const userRouter = router;
// export default router