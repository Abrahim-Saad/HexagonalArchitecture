import 'dotenv-flow/config';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port =  process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


// app.use('/api/v1/');


app.listen(port, () => {
    console.log(`Running in [${process.env.NODE_ENV} environment] at port: [${port}]`);
});
