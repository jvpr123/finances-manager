import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUserRepository } from "src/data/protocols/database/FindUserRepository.interface";
import { IFindUserByEmailUseCase } from "src/domain/useCases/users/read/FindUserByEmail.interface";

import { ValidationError } from "src/errors/validation/Validation.error";
import { FindUserByEmailUseCase } from "./FindUserByEmail.usecase";

describe("Find User By Email UseCase", () => {
  const makeValidatorStub = (): IValidator => ({
    validate: resolveValue({ isValid: true, data: "user@email.com" }),
  });

  const makeRepositoryStub = (): IFindUserRepository => ({
    findByEmail: resolveValue(makeFakeUser()),
  });

  const makeSUT = (validator: IValidator, repository: IFindUserRepository) =>
    new FindUserByEmailUseCase(validator, repository);

  let sut: IFindUserByEmailUseCase;
  let validator: IValidator;
  let repository: IFindUserRepository;

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();

    sut = makeSUT(validator, repository);

    validator.validate = jest
      .fn()
      .mockReturnValue({ isValid: true, data: "user@email.com" });
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute("user@email.com");
      expect(validator.validate).toBeCalledWith("user@email.com");
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

    it("should return an UserModel instance when operations succeed", async () => {
      expect(sut.execute("user@email.com")).resolves.toEqual(makeFakeUser());
    });
  });
});
