import express from 'express'

import { authMiddleware  } from '../middleware'
import { Router } from 'express';
import { SigninSchema,  SignupSchema } from '../types';
import { PrismaClient } from '../../generated/prisma';
import { parse } from 'zod';
import { prisma } from '../db'
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

    const userexists = await prisma.user.findFirst({
        where : {
            email : parsedBody.data?.email
        }
    })
    if (!userexists) return res.status(411).send(" THe user is not egistered")

    
})

router.get('/user', authMiddleware, (req, res)=> {
    console.log("this is a get user handler")
})

export const userRouter = router;
// export default router