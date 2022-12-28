import express from "express";
import cors from "cors";
import { v1Routes } from "./routes/v1.routes";

const server = express();
const serverPort = Number(process.env.APP_PORT) || 8080;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/v1", v1Routes);

export { server, serverPort };
