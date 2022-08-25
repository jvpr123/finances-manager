import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeFindUsersRepositoryStub } from "src/__tests__/utils/typeORM/FindUsersRepository.factory";

import { FindAllUsersUseCase } from "./FindAllUsers.usecase";
import { IFindAllUsersUseCase } from "src/domain/useCases/users/read/FindAllUsers.interface";
import { IFindUsersRepository } from "src/data/protocols/database/FindUsersRepository.interface";

describe("Find All Users UseCase", () => {
  const makeSUT = (repository: IFindUsersRepository) =>
    new FindAllUsersUseCase(repository);

  let sut: IFindAllUsersUseCase;
  let repository: IFindUsersRepository;

  beforeEach(() => {
    repository = makeFindUsersRepositoryStub();
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
