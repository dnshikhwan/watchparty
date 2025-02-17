import express, { Express } from "express";
import compression from "compression";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

dotenv.config();

import { createRouter } from "./router";
import { logger } from "./helpers/log.helper";
import { requestLogger } from "./middlewares/request.middleware";
import { errorHandler } from "./helpers/error.helper";
import { prismaInit } from "./prisma/prisma";
import { corsOptions } from "./configs";
import { socketInit } from "./socket";

const PORT: string | number = process.env.PORT || 5000;
const app: Express = express();
const server = http.createServer(app);

app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(requestLogger);
app.use("/api", createRouter());

server.listen(PORT, () => {
  prismaInit(); // initialize prisma
  socketInit(server); // initialize socket.io
  logger.info(`Server is running on port ${PORT}`);
});
