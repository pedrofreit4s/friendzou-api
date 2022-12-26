import { Prisma, User } from "@prisma/client";

export interface IUserRepositoryContract {
  findByEmail(email: string): Promise<Prisma.UserGetPayload<{
    include: {
      AccountCodes: true;
    };
  }> | null>;
  findByWhatsapp(whatsapp: string): Promise<Prisma.UserGetPayload<{
    include: {
      AccountCodes: true;
    };
  }> | null>;
  create(data: Prisma.UserCreateArgs): Promise<User>;
  update(data: Prisma.UserUpdateArgs): Promise<User>;
}
