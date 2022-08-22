import {
  makeFakeUser,
  makeFakeUserDto,
} from "src/__tests__/utils/UserMocks.factory";

import { ICreateUserDto } from "@domain/dto/users/CreateUser.dto";
import { ICreateUserUseCase } from "@domain/useCases/users/create/CreateUser.interface";

import { CreateUserUseCase } from "./CreateUser.usecase";
import { IValidator } from "@data/protocols/Validator.interface";
import { IEncrypter } from "@data/protocols/Encrypter.interface";
import { IUserRepository } from "@data/protocols/UserRepository.interface";

describe("Create User UseCase", () => {
  const makeValidatorStub = (): IValidator<ICreateUserDto> => ({
    validate: jest.fn().mockResolvedValue(makeFakeUserDto()),
  });

  const makeEncrypterStub = (): IEncrypter => ({
    hash: jest.fn().mockResolvedValue("hashed_password"),
  });

  const makeRepositoryStub = (): IUserRepository => ({
    create: jest.fn().mockResolvedValue(makeFakeUser()),
  });

  const makeSUT = (
    validator: IValidator<ICreateUserDto>,
    encrypter: IEncrypter,
    repository: IUserRepository
  ) => new CreateUserUseCase(validator, encrypter, repository);

  let sut: ICreateUserUseCase;
  let validator: IValidator<ICreateUserDto>;
  let encrypter: IEncrypter;
  let repository: IUserRepository;

  beforeAll(() => {
    validator = makeValidatorStub();
    encrypter = makeEncrypterStub();
    repository = makeRepositoryStub();

    sut = makeSUT(validator, encrypter, repository);
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute(makeFakeUserDto());
      expect(validator.validate).toHaveBeenCalledWith(makeFakeUserDto());
    });

    it("should continue method execution when validation succeeds", async () => {
      await sut.execute(makeFakeUserDto());

      expect(encrypter.hash).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });

    it("should not continue method execution when validation fails", async () => {
      validator.validate = jest.fn().mockRejectedValueOnce(new Error());

      expect(sut.execute(makeFakeUserDto())).rejects.toThrow();
    });
  });

  describe("Dependency: Encrypter", () => {
    it("should call encrypter with correct password", async () => {
      const fakeUserInput = makeFakeUserDto();

      await sut.execute(fakeUserInput);
      expect(encrypter.hash).toHaveBeenCalledWith(fakeUserInput.password);
    });

    it("should throw an error when encrypter throws", async () => {
      jest.spyOn(encrypter, "hash").mockRejectedValueOnce(new Error());
      expect(sut.execute(makeFakeUserDto())).rejects.toThrow(new Error());
    });
  });

  describe("Dependency: Users Repository", () => {
    it("should call users repository with correct values", async () => {
      const fakeUserInput = makeFakeUserDto();

      await sut.execute(fakeUserInput);
      expect(repository.create).toHaveBeenCalledWith({
        ...fakeUserInput,
        password: "hashed_password",
      });
    });

    it("should throw an error when repository throws", async () => {
      jest.spyOn(repository, "create").mockRejectedValueOnce(new Error());
      expect(sut.execute(makeFakeUserDto())).rejects.toThrow(new Error());
    });

    it("should return an UserModel instance when operations succeed", async () => {
      expect(sut.execute(makeFakeUserDto())).resolves.toEqual(makeFakeUser());
    });
  });
});
