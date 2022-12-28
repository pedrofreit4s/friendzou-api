import { ActiveCodeRepository } from "../../activate-account/repositories/ActivateCodeRepository";
import { LocalizationRepository } from "../../localizations/repositories/LocalizationRepository";
import { UserRepository } from "../../user/repositories/UserRepository";
import { BoardingController } from "./BoardingController";

const boardingController = new BoardingController(
  new UserRepository(),
  new ActiveCodeRepository(),
  new LocalizationRepository()
);

export { boardingController };
