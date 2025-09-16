
import { Kafka } from "kafkajs";
import { PrismaClient } from "../generated/prisma"

const client =  new PrismaClient()
 
const TOPIC_NAME = "zap-events"

const kafka = new Kafka ({
    clientId : "outbox-processor",
    brokers: ['localhost:9092']
})
interface pendingRows {
    id : string;
    zapRunID : string;
}

async function main (){
    const producer =  kafka.producer();
    await producer.connect();

    while (1){

        const pendingRows : pendingRows[] = await client.zapRunOutbox.findMany({
            where : {},
            take : 10
        });
  
        producer.send({
            topic : TOPIC_NAME,
            // messages: pendingRows.map(r => ({
            //     value : r.zapRunID
            // }))
            messages: pendingRows.map(r => {
                return {
                    value: JSON.stringify({zapRunID : r.zapRunID, stage : 0})
                }
            })
        })

        // delete the zapoutbox entries from the database 
        await client.zapRunOutbox.deleteMany({
            where: {
                id : {
                    in : pendingRows.map(x => x.id) // delete an array of id's
                }
            }
        })

    } 

}