import { Localizations, Prisma } from "@prisma/client";
import { client } from "../../../infra/database/client";

export class LocalizationRepository {
  findAll(): Promise<Localizations[]> {
    return client.localizations.findMany();
  }
  findByUserId(user_id: string): Promise<Localizations | null> {
    return client.localizations.findFirst({
      where: {
        user: {
          id: user_id,
        },
      },
    });
  }
  findById(id: string): Promise<Localizations | null> {
    return client.localizations.findUnique({
      where: {
        id,
      },
    });
  }
  findByCode(code: string): Promise<Localizations | null> {
    return client.localizations.findUnique({
      where: {
        code,
      },
    });
  }
  update(data: Prisma.LocalizationsUpdateArgs): Promise<Localizations> {
    return client.localizations.update(data);
  }
  create(data: Prisma.LocalizationsCreateArgs): Promise<Localizations> {
    return client.localizations.create(data);
  }
}
