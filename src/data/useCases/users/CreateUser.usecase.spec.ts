import {
  makeFakeUser,
  makeFakeUserDto,
  makeFakeUserInput,
} from "src/__tests__/utils/UserMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { ICreateUserUseCase } from "src/domain/useCases/users/create/CreateUser.interface";

import { CreateUserUseCase } from "./CreateUser.usecase";
import { IValidator } from "src/data/protocols/Validator.interface";
import { IEncrypter } from "src/data/protocols/Encrypter.interface";
import { IUserRepository } from "src/data/protocols/UserRepository.interface";

import { ValidationError } from "src//errors/validation/Validation.error";

describe("Create User UseCase", () => {
  const makeValidatorStub = (): IValidator => ({
    validate: resolveValue({ isValid: true, data: makeFakeUserInput() }),
  });

  const makeEncrypterStub = (): IEncrypter => ({
    hash: resolveValue("hashed_password"),
  });

  const makeRepositoryStub = (): IUserRepository => ({
    create: resolveValue(makeFakeUser()),
  });

  const makeSUT = (
    validator: IValidator,
    encrypter: IEncrypter,
    repository: IUserRepository
  ) => new CreateUserUseCase(validator, encrypter, repository);

  let sut: ICreateUserUseCase;
  let validator: IValidator;
  let encrypter: IEncrypter;
  let repository: IUserRepository;

  beforeEach(() => {
    validator = makeValidatorStub();
    encrypter = makeEncrypterStub();
    repository = makeRepositoryStub();

    validator.validate = jest
      .fn()
      .mockReturnValue({ isValid: true, data: makeFakeUserDto() });

    sut = makeSUT(validator, encrypter, repository);
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute(makeFakeUserInput());
      expect(validator.validate).toBeCalledWith(makeFakeUserInput());
    });

    it("should continue method execution when validation succeeds", async () => {
      await sut.execute(makeFakeUserInput());

      expect(encrypter.hash).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute(makeFakeUserInput())).rejects.toEqual(
        new ValidationError(["validation_error"])
      );
    });
  });

  describe("Dependency: Encrypter", () => {
    it("should call encrypter with correct password", async () => {
      const fakeUserInput = makeFakeUserDto();

      await sut.execute(fakeUserInput);
      expect(encrypter.hash).toHaveBeenCalledWith(fakeUserInput.password);
    });

    it("should throw an error when encrypter throws", async () => {
      encrypter.hash = rejectValueOnce(new Error());
      expect(sut.execute(makeFakeUserDto())).rejects.toThrow(new Error());
    });
  });

  describe("Dependency: Users Repository", () => {
    it("should call users repository with correct values", async () => {
      await sut.execute(makeFakeUserDto());
      expect(repository.create).toHaveBeenCalledWith({
        ...makeFakeUserDto(),
        password: "hashed_password",
      });
    });

    it("should throw an error when repository throws", async () => {
      repository.create = rejectValueOnce(new Error());
      expect(sut.execute(makeFakeUserDto())).rejects.toThrow(new Error());
    });

    it("should return an UserModel instance when operations succeed", async () => {
      expect(sut.execute(makeFakeUserDto())).resolves.toEqual(makeFakeUser());
    });
  });
});
