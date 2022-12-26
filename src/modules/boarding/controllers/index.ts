import { ActiveCodeRepository } from "../../activate-account/repositories/ActivateCodeRepository";
import { UserRepository } from "../../user/repositories/UserRepository";
import { BoardingController } from "./BoardingController";

const boardingController = new BoardingController(
  new UserRepository(),
  new ActiveCodeRepository()
);

export { boardingController };
