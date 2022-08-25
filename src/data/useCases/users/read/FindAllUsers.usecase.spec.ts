import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindAllUsersUseCase } from "src/domain/useCases/users/read/FindAllUsers.interface";

import { IFindAllUsersRepository } from "src/data/protocols/database/FindAllUsersRepository.interface";
import { FindAllUsersUseCase } from "./FindAllUsers.usecase";

describe("Find All Users UseCase", () => {
  const makeRepositoryStub = (): IFindAllUsersRepository => ({
    findAll: resolveValue([makeFakeUser()]),
  });

  const makeSUT = (repository: IFindAllUsersRepository) =>
    new FindAllUsersUseCase(repository);

  let sut: IFindAllUsersUseCase;
  let repository: IFindAllUsersRepository;

  beforeEach(() => {
    repository = makeRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Users Repository", () => {
    it("should call users repository with correct values", async () => {
      await sut.execute();
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when repository throws", async () => {
      repository.findAll = rejectValueOnce(new Error());
      expect(sut.execute()).rejects.toThrow(new Error());
    });

    it("should return an array of UserModel instance when operation succeeds", async () => {
      expect(sut.execute()).resolves.toEqual([makeFakeUser()]);
    });
  });
});
