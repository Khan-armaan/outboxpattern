import  { Router } from "express";
import { authMiddleware } from "../middleware"

const router = Router();

router.post('/', authMiddleware,  (req, res) => {
    console.log("create a new zap");
})

router.get('/', authMiddleware,(req, res) => {
    console.log("zap handlers ")
})

router.get('/:zapid', authMiddleware,(req , res) => {
    console.log("creating a new zap"); 
})

export const zapRouter = router;