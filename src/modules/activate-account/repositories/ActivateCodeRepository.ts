import { AccountCodes, Prisma } from "@prisma/client";
import { client } from "../../../infra/database/client";
import { IActivateCodeRepositoryContract } from "./contracts/IActivateCodeRepositoryContract";
import { randomUUID } from "crypto";

export class ActiveCodeRepository implements IActivateCodeRepositoryContract {
  delete(id: string): Promise<AccountCodes> {
    return client.accountCodes.delete({ where: { id } });
  }
  findByCode(code: string): Promise<Prisma.AccountCodesGetPayload<{
    include: {
      user: true;
    };
  }> | null> {
    return client.accountCodes.findUnique({ where: { code }, include: { user: true } });
  }
  findByUserId(user_id: string): Promise<Prisma.AccountCodesGetPayload<{
    include: {
      user: true;
    };
  }> | null> {
    return client.accountCodes.findFirst({ where: { user_id }, include: { user: true } });
  }
  create(user_id: string): Promise<AccountCodes> {
    return client.accountCodes.create({
      data: {
        code: randomUUID(),
        user: {
          connect: { id: user_id },
        },
      },
    });
  }
}
