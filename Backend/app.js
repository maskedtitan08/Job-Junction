import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import userRouter from "./routes/userRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import jobRouter from "./routes/jobRouter.js"
import {dbConnection} from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";


const app = express();
dotenv.config({ path: "./config/.env" });

// frontend ke sath connection bnane k liye 
app.use(cors({
    origin : [process.env.FRONTEND_URL],    // used [] beacuse we can link more than one frontend to our backend based on frontend url
    methods : ["GET", "POST","DELETE","PUT"],  //methods allowed to do things in backend
    credentials: true,   //access-control-allow-credentials : true

}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}));

// app.use("/api/users", userRouter);
// app.use("/api/applications", applicationRouter);
// app.use('/api/jobs', jobRouter);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

dbConnection();
app.use(errorMiddleware); // I call the error middlware when there is an error in the the request



export default app;