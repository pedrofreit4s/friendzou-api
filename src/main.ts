import "reflect-metadata";
import "dotenv/config";
import "./infra/container";
import { server, serverPort } from "./infra/http/server";
import { logger } from "./infra/utils/logger";

server.listen(serverPort, () =>
  logger.succ(`listening http server on port ::${serverPort}`)
);
