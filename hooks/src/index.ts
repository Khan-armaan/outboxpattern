import express from "express";

const app = express();

app.post('/hook/catch/:userId/:zapId', (req, res) => {
    
    //path parameters not the query parametes 
    const userId = req.params.userId;
    const zapId = req.params.zapId;

    // store in DB a new trigger
    // push the event into a queue 
})

app.listen(3000)