import express from "express";
import { PrismaClient } from "../generated/prisma";


const client = new PrismaClient()
const app = express();

app.use(express.json())

app.post('/hook/catch/:userId/:zapId', async (req, res) => {
    
    //path parameters not the query parametes 
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    // store in DB a new trigger and in the outbox using the transaction
    await client.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
            data : {
                zapId : zapId,
                metadata: body
            }
        })
        await tx.zapRunOutbox.create({
            data : {
                zapRunID : run.id
            }
        })
    })
    res.status(200).json({
        message : "webhook created successfully"
    })

    // push the event into a queue 
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});