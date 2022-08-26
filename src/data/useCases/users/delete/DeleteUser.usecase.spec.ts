import { makeFindUsersRepositoryStub } from "src/__tests__/utils/typeORM/users/FindUsersRepository.factory";
import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { NotFoundError } from "src/errors/NotFound.error";

import { DeleteUserlUseCase } from "./DeleteUser.usecase";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";
import { IDeleteUserRepository } from "src/data/protocols/database/users/DeleteUserRepository.interface";

import { IDeleteUserUseCase } from "src/domain/useCases/users/delete/DeleteUser.interface";

type Repository = IFindUsersRepository & IDeleteUserRepository;
describe("Delete User UseCase", () => {
  const user = makeFakeUser();
  let sut: IDeleteUserUseCase;
  let repository: Repository;

  const makeRepositoryStub = (): Repository => ({
    ...makeFindUsersRepositoryStub(),
    delete: resolveValue(true),
  });

  const makeSUT = (repository: Repository) =>
    new DeleteUserlUseCase(repository);

  beforeEach(() => {
    repository = makeRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Users Repository", () => {
    it("should call findById() method from users repository with correct values", async () => {
      await sut.execute(user.id);
      expect(repository.findById).toHaveBeenCalledWith(user.id);
    });

    it("should throw an error when repository throws", async () => {
      repository.findById = rejectValueOnce(new Error());
      expect(sut.execute(user.id)).rejects.toThrow(new Error());
    });

    it("should throw a Not Found Error when repository returns undefined", async () => {
      repository.findById = resolveValueOnce(undefined);

      expect(sut.execute(user.id)).rejects.toEqual(
        new NotFoundError(
          `Could not delete: data related to ID ${user.id} not found`
        )
      );
    });

    it("should call delete() method from users repository with correct values", async () => {
      await sut.execute(user.id);
      expect(repository.delete).toHaveBeenCalledWith(user.id);
    });

    it("should call delete() method from users repository with correct values", async () => {
      await sut.execute(user.id);
      expect(repository.delete).toHaveBeenCalledWith(user.id);
    });

    it("should return true when deletion succeeds", async () => {
      expect(sut.execute(user.id)).resolves.toEqual(true);
    });
  });
});
