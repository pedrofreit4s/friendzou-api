import { Request, Response } from "express";
import { IUserRepositoryContract } from "../../user/repositories/contracts/IUserRepositoryContract";
import { LocalizationRepository } from "../../localizations/repositories/LocalizationRepository";
import { IActivateCodeRepositoryContract } from "../../activate-account/repositories/contracts/IActivateCodeRepositoryContract";
import { sendWhatsappMessage } from "../../../services/send-whatsapp-message";
import { IUser } from "../../user/entities/IUser";
import { hashSync } from "bcrypt";
import { ILocalization } from "../../localizations/entities/ILocalization";

export class BoardingController {
  constructor(
    private userRepository: IUserRepositoryContract,
    private activeCodeRepository: IActivateCodeRepositoryContract,
    private localizationRepositoy: LocalizationRepository
  ) {}

  create = async (request: Request, response: Response): Promise<Response> => {
    const { whatsapp } = request.body as IUser;

    if (!whatsapp)
      return response.status(400).send({ message: "Número de whatsapp não informado!" });

    const userAlreadyExists = await this.userRepository.findByWhatsapp(whatsapp);
    if (userAlreadyExists) {
      if (userAlreadyExists.isActive)
        return response
          .status(400)
          .send({ message: "Número de whatsapp já cadastrado!" });

      await sendWhatsappMessage(
        userAlreadyExists.whatsapp,
        `_Olá, ${
          userAlreadyExists.name || "Usuário"
        }!_\nfoi criada uma conta com o seu número, caso não tenha sido você, desconsidere esta mensagem!\n\n *📤 - use o link*: \nhttps://friendzou.com.br/boarding/cadastro/${
          userAlreadyExists.AccountCodes[0].code
        }\n\n _Att, *Friendzou ™*_`
      );
      return response.status(201).send({
        message:
          "Show! Enviamos uma mensagem para o seu whatsapp para ativar a sua conta!",
      });
    }

    const user = await this.userRepository.create({
      data: {
        whatsapp,
      },
    });
    const code = await this.activeCodeRepository.create(user.id);
    await sendWhatsappMessage(
      user.whatsapp,
      `_Olá, ${
        user.name || "Usuário"
      }!_\nfoi criada uma conta com o seu número, caso não tenha sido você, desconsidere esta mensagem!\n\n *📤 - use o link*: \nhttps://friendzou.com.br/boarding/cadastro/${
        code.code
      }\n\n _Att, *Friendzou ™*_`
    );

    return response.status(201).send({
      message: "Show! Enviamos uma mensagem para o seu whatsapp para ativar a sua conta!",
    });
  };

  addInformation = async (request: Request, response: Response): Promise<Response> => {
    const { name, email, password } = request.body as IUser;
    const { token } = request.query;

    if (!token || !name || !password)
      return response
        .status(400)
        .send({ message: "Houve um erro ao processar seus dados!" });

    const code = await this.activeCodeRepository.findByCode(token.toString());
    if (!code)
      return response.status(404).send({ message: "Código de ativação não encontrado!" });

    await this.userRepository.update({
      where: {
        id: code.user.id,
      },
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });

    return response.status(200).send({
      message: "Bem-vindo a nossa plataforma!",
    });
  };

  addLocalization = async (request: Request, response: Response): Promise<Response> => {
    const { code, name } = request.body as ILocalization;
    const { token } = request.query;

    if (!token || !code || !name)
      return response
        .status(400)
        .send({ message: "Houve um erro ao processar seus dados!" });

    const accessCode = await this.activeCodeRepository.findByCode(token.toString());
    if (!accessCode)
      return response.status(404).send({ message: "Código de ativação não encontrado!" });

    const localizationAlreadyExists = await this.localizationRepositoy.findByUserId(
      accessCode.user.id
    );
    if (localizationAlreadyExists)
      return response.status(400).send({ message: "Localização já selecionada!" });

    await this.localizationRepositoy.create({
      data: {
        code,
        name,
        user: {
          connect: {
            id: accessCode.user.id,
          },
        },
      },
    });
    await this.userRepository.update({
      where: {
        id: accessCode.user.id,
      },
      data: {
        isActive: true,
      },
    });
    await this.activeCodeRepository.delete(accessCode.id);

    return response.status(200).send({
      message: "Localização selecionada!",
    });
  };
}
