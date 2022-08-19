import { ICreateUserUseCase } from "@domain/useCases/users/create/CreateUser.interface";

import { CreateUserUseCase } from "./CreateUser.usecase";
import { IEncrypter } from "@data/protocols/Encrypter.interface";
import { IUserRepository } from "@data/protocols/UserRepository.interface";
import {
  makeFakeUser,
  makeFakeUserDto,
} from "src/__tests__/utils/UserMocks.factory";

describe("Create User UseCase", () => {
  const makeEncrypterStub = (): IEncrypter => ({
    hash: jest.fn().mockResolvedValue("hashed_password"),
  });

  const makeRepositoryStub = (): IUserRepository => ({
    create: jest.fn().mockResolvedValue(makeFakeUser()),
  });

  const makeSUT = (encrypter: IEncrypter, repository: IUserRepository) =>
    new CreateUserUseCase(encrypter, repository);

  let sut: ICreateUserUseCase;
  let encrypter: IEncrypter;
  let repository: IUserRepository;

  beforeAll(() => {
    encrypter = makeEncrypterStub();
    repository = makeRepositoryStub();
    sut = makeSUT(encrypter, repository);
  });

  it("should call encrypter with correct password", async () => {
    const fakeUserInput = makeFakeUserDto();

    await sut.execute(fakeUserInput);
    expect(encrypter.hash).toHaveBeenCalledWith(fakeUserInput.password);
  });

  it("should throw an error when encrypter throws", async () => {
    jest.spyOn(encrypter, "hash").mockRejectedValueOnce(new Error());
    expect(sut.execute(makeFakeUserDto())).rejects.toThrow(new Error());
  });

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
