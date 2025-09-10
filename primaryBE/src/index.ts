import express from 'express';
import { userRouter } from './routes/user';
import  { zapRouter } from './routes/zap' 
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api/v1/user', userRouter);

app.use('/api/v1/zap', zapRouter);



app.listen(4000, ()=> {
    console.log('Server is running on port 4000');
})