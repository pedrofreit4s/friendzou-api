import { Router } from "express";
import { boardingController } from "../../../modules/boarding/controllers";

const v1Routes = Router();

// Boarding
v1Routes.post("/boarding", boardingController.create);
v1Routes.patch("/boarding", boardingController.addInformation);
v1Routes.patch("/boarding/localizations", boardingController.addLocalization);

export { v1Routes };
