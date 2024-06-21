/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import AppError from './app/errors/AppError';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API of sportsify');
})

// application routes
app.use('/api', router);

app.use(globalErrorHandler);

//Not Found
// app.all("*",notFound);
app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
})

export default app;
