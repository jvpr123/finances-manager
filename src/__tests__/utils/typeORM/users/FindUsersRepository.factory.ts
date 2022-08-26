import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";

import { resolveValue } from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";

export const makeFindUsersRepositoryStub = (): IFindUsersRepository => ({
  findByEmail: resolveValue(makeFakeUser()),
  findById: resolveValue(makeFakeUser()),
  findAll: resolveValue([makeFakeUser()]),
});
