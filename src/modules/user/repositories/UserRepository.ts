import { Prisma, User } from "@prisma/client";
import { client } from "../../../infra/database/client";
import { IUser } from "../entities/IUser";
import { IUserRepositoryContract } from "./contracts/IUserRepositoryContract";

export class UserRepository implements IUserRepositoryContract {
  update(data: Prisma.UserUpdateArgs): Promise<User> {
    return client.user.update(data);
  }
  findByEmail(email: string): Promise<Prisma.UserGetPayload<{
    include: {
      AccountCodes: true;
    };
  }> | null> {
    return client.user.findUnique({
      where: { email },
      include: {
        AccountCodes: true,
      },
    });
  }
  findByWhatsapp(whatsapp: string): Promise<Prisma.UserGetPayload<{
    include: {
      AccountCodes: true;
    };
  }> | null> {
    return client.user.findUnique({
      where: { whatsapp },
      include: {
        AccountCodes: true,
      },
    });
  }
  create(data: Prisma.UserCreateArgs): Promise<User> {
    return client.user.create(data);
  }
}
