import {
  makeFakeUser,
  makeFakeUserDto,
  makeFakeCreateUserInput,
} from "src/__tests__/utils/UserMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { ICreateUserUseCase } from "src/domain/useCases/users/create/CreateUser.interface";

import { CreateUserUseCase } from "./CreateUser.usecase";
import { IValidator } from "src/data/protocols//validation/Validator.interface";
import { IEncrypter } from "src/data/protocols/cryptography/Encrypter.interface";

import { ValidationError } from "src/errors/Validation.error";
import { ICreateUserRepository } from "src/data/protocols/database/users/CreateUserRepository.interface";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";

const makeValidatorStub = (): IValidator => ({
  validate: resolveValue({ isValid: true, data: makeFakeCreateUserInput() }),
});

const makeEncrypterStub = (): IEncrypter => ({
  hash: resolveValue("hashed_password"),
});

const makeRepositoryStub = (): ICreateUserRepository &
  IFindUsersRepository => ({
  create: resolveValue(makeFakeUser()),
  findByEmail: resolveValue(undefined),
  findById: resolveValue(undefined),
  findAll: resolveValue(undefined),
});

const makeSUT = (
  validator: IValidator,
  encrypter: IEncrypter,
  repository: ICreateUserRepository & IFindUsersRepository
) => new CreateUserUseCase(validator, encrypter, repository);

describe("Create User UseCase", () => {
  let sut: ICreateUserUseCase;
  let validator: IValidator;
  let encrypter: IEncrypter;
  let repository: ICreateUserRepository & IFindUsersRepository;

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
      await sut.execute(makeFakeCreateUserInput());
      expect(validator.validate).toBeCalledWith(makeFakeCreateUserInput());
    });

    it("should continue method execution when validation succeeds", async () => {
      await sut.execute(makeFakeCreateUserInput());

      expect(encrypter.hash).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute(makeFakeCreateUserInput())).rejects.toEqual(
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
    it("should call create() method from users repository with correct values", async () => {
      await sut.execute(makeFakeUserDto());
      expect(repository.create).toHaveBeenCalledWith({
        ...makeFakeUserDto(),
        password: "hashed_password",
      });
    });

    it("should call findByEmail() method from users repository with correct values", async () => {
      await sut.execute(makeFakeUserDto());
      expect(repository.findByEmail).toHaveBeenCalledWith(
        makeFakeUserDto().email
      );
    });

    it("should throw a Validation Error when email already exists", async () => {
      repository.findByEmail = resolveValueOnce(makeFakeUser());
      expect(sut.execute(makeFakeUserDto())).rejects.toThrow();
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
