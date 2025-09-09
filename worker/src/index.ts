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
        
    })

}
main()
