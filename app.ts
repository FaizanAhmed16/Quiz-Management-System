import { Request, Response, NextFunction } from 'express';
import express from 'express';
import mongoose from 'mongoose';

import userRoute from './routes/user'
import authRoute from './routes/auth'
import quizRoute from './routes/quiz'
import examRoute from './routes/exam'
import reportRoute from './routes/report'

const app = express();

app.use(express.json());

declare global {
    namespace Express {
        interface Request {
            userId: String;
        }
    }
}

const connectionString = process.env.CONNECTION_STRING || "";

app.use('/user', userRoute)

app.use('/auth', authRoute)

app.use('/quiz', quizRoute)

app.use('/exam', examRoute)

app.use('/report', reportRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.send("Something went wrong, please try again")
})

mongoose.connect(connectionString).then(() => {
    console.log('connection is succesful')
    app.listen(process.env.PORT, () => {
        console.log("Server is Connected");
    })
}).catch((e) => {
    console.log(e.message)
})

//yarn ts-node ./src/app.ts

