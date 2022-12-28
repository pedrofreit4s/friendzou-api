import { Request, Response } from "express";
import { LocalizationRepository } from "../repositories/LocalizationRepository";

export class LocalizationController {
  constructor(private readonly localizationRepository: LocalizationRepository) {}
}
