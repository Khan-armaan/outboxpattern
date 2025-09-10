// Pull from queue and do some work
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9902']
})

async function main () {
    const consumer = kafka.consumer({
        groupId: 'main-worker'
    })
    await consumer.connect();

    await consumer.subscribe({
        topic : TOPIC_NAME,
        fromBeginning : true

    })

    await consumer.run({
        autoCommit: false,
        eachMessage : async ({ topic,partition, message}) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString()
            })
           await new Promise((resolve) => setTimeout(resolve, 1000)) 

           //give some sort of acknowlegdement to the kafka broker commit offset
           // topic is the queue name
           // offset is the message id
              await consumer.commitOffsets([
                {
                 topic : TOPIC_NAME,
                 partition,
                 offset: (Number(message.offset) + 1).toString()
                }
              ])
        }
    })

}
main()
