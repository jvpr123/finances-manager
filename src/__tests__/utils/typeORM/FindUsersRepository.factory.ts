import { IFindUsersRepository } from "src/data/protocols/database/FindUsersRepository.interface";

import { resolveValue } from "../jest/MockReturnValues.factory";
import { makeFakeUser } from "../UserMocks.factory";

export const makeFindUsersRepositoryStub = (): IFindUsersRepository => ({
  findByEmail: resolveValue(makeFakeUser()),
  findById: resolveValue(makeFakeUser()),
  findAll: resolveValue([makeFakeUser()]),
});
