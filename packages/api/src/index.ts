import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import router from './routes';
import { initDb } from './db';


require('dotenv').config();

const port = process.env.PORT;

const app = express();

const corsOptions = {
    credentials: true,
    origin: "*", // [process.env.FRONT_URL],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

initDb();

http.createServer(app).listen(port, () =>
    console.log(`\n\nServer Api Online http://localhost:${port}\n\n`));
