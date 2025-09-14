import { Router } from "express";
import { prisma } from "../db";


const router = Router();

router.get('/available', async (req, res) => {
    const availableAction = await prisma.availableActions.findMany({})
    res.status(200).json({
        availableAction
    })
})


export const actionRouter = router;
