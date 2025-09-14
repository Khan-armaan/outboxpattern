import { Router } from "express";
import { prisma } from "../db";

const router = Router();



router.get('/available',async (req,res) => {
    const availableTriggers = await prisma.availableTriggers.findMany({});

    res.status(200).json({
        availableTriggers
    })
})




export const triggerRouter = router;