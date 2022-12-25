import express from "express";
import { v1Routes } from "./routes/v1.routes";

const server = express();
const serverPort = Number(process.env.APP_PORT) || 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(v1Routes);

export { server, serverPort };
