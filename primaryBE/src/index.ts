import express from 'express';
import { userRouter } from './routes/user';
import  { zapRouter } from './routes/zap'
import cors from "cors"
import { actionRouter } from './routes/action';
import { triggerRouter } from './routes/trigger';


const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api/v1/user', userRouter);

app.use('/api/v1/zap', zapRouter);

app.use('/api/v1/actions', actionRouter);

app.use('/api/v1/trigger', triggerRouter);;



app.listen(4000, ()=> {
    console.log('Server is running on port 4000');
})