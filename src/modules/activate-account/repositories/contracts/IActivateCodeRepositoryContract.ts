import { AccountCodes, Prisma } from "@prisma/client";

export interface IActivateCodeRepositoryContract {
  findByCode(code: string): Promise<Prisma.AccountCodesGetPayload<{
    include: {
      user: true;
    };
  }> | null>;
  findByUserId(user_id: string): Promise<Prisma.AccountCodesGetPayload<{
    include: {
      user: true;
    };
  }> | null>;
  create(user_id: string): Promise<AccountCodes>;
  delete(id: string): Promise<AccountCodes>;
}
