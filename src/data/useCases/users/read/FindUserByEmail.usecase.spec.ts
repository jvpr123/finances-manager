import { makeFindUsersRepositoryStub } from "src/__tests__/utils/typeORM/users/FindUsersRepository.factory";
import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindUserByEmailUseCase } from "src/domain/useCases/users/read/FindUserByEmail.interface";

import { FindUserByEmailUseCase } from "./FindUserByEmail.usecase";
import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

describe("Find User By Email UseCase", () => {
  const makeValidatorStub = (): IValidator => ({
    validate: resolveValue({ isValid: true, data: "user@email.com" }),
  });

  const makeSUT = (validator: IValidator, repository: IFindUsersRepository) =>
    new FindUserByEmailUseCase(validator, repository);

  let sut: IFindUserByEmailUseCase;
  let validator: IValidator;
  let repository: IFindUsersRepository;

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeFindUsersRepositoryStub();

    sut = makeSUT(validator, repository);

    validator.validate = jest
      .fn()
      .mockReturnValue({ isValid: true, data: "user@email.com" });
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute("user@email.com");
      expect(validator.validate).toBeCalledWith({ email: "user@email.com" });
    });

    it("should continue method execution when validation succeeds", async () => {
      await sut.execute("user@email.com");
      expect(repository.findByEmail).toHaveBeenCalledTimes(1);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute("user@email.com")).rejects.toEqual(
        new ValidationError(["validation_error"])
      );
    });
  });

  describe("Dependency: Users Repository", () => {
    it("should call users repository with correct values", async () => {
      await sut.execute("user@email.com");
      expect(repository.findByEmail).toHaveBeenCalledWith("user@email.com");
    });

    it("should throw an error when repository throws", async () => {
      repository.findByEmail = rejectValueOnce(new Error());
      expect(sut.execute("user@email.com")).rejects.toThrow(new Error());
    });

    it("should throw a Not Found Error when repository returns undefined", async () => {
      repository.findByEmail = resolveValueOnce(undefined);

      expect(sut.execute("unregistered@email.com")).rejects.toEqual(
        new NotFoundError(
          "Could not find data related to unregistered@email.com address"
        )
      );
    });

    it("should return an UserModel instance when operations succeed", async () => {
      expect(sut.execute("user@email.com")).resolves.toEqual(makeFakeUser());
    });
  });
});
