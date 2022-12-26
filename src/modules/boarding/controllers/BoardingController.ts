import { Request, Response } from "express";
import { sendWhatsappMessage } from "../../../services/send-whatsapp-message";
import { IActivateCodeRepositoryContract } from "../../activate-account/repositories/contracts/IActivateCodeRepositoryContract";
import { IUser } from "../../user/entities/IUser";
import { IUserRepositoryContract } from "../../user/repositories/contracts/IUserRepositoryContract";
import { hashSync } from "bcrypt";

export class BoardingController {
  constructor(
    private userRepository: IUserRepositoryContract,
    private activeCodeRepository: IActivateCodeRepositoryContract
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
        }!_\nfoi criada uma conta com o seu número, caso não tenha sido você, desconsidere esta mensagem!\n\n *📤 - use o link*: \nhttps://friendzou.com.br/activate-account/${
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
      }!_\nfoi criada uma conta com o seu número, caso não tenha sido você, desconsidere esta mensagem!\n\n *📤 - use o link*: \nhttps://friendzou.com.br/activate-account/${
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
        isActive: true,
      },
    });
    await this.activeCodeRepository.delete(code.id);

    return response.status(200).send({
      message: "Bem-vindo a nossa plataforma!",
    });
  };
}
