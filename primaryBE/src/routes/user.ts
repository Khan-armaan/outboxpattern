import express from 'express'
import { authMiddleware  } from '../middleware'
import { Router } from 'express';

const router = Router();


router.post('/signup', (req, res) => {
    console.log("this is the signup.handler")
})

router.post('/signin', (req, res) =>  {
    console.log("This is a sign in handler")
})

router.get('/user', authMiddleware, (req, res)=> {
    console.log("this is a get user handler")
})

export const userRouter = router;
// export default router