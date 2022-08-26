import {
  makeFakeUser,
  makeFakeUpdateUserInput,
} from "src/__tests__/utils/UserMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { ICreateUserUseCase } from "src/domain/useCases/users/create/CreateUser.interface";

import { UpdateUserUseCase } from "./UpdateUser.usecase";
import { IValidator } from "src/data/protocols//validation/Validator.interface";
import { IUpdateUserRepository } from "src/data/protocols/database/UpdateUser.interface";
import { IFindUsersRepository } from "src/data/protocols/database/FindUsersRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { makeFindUsersRepositoryStub } from "src/__tests__/utils/typeORM/FindUsersRepository.factory";

describe("Update User UseCase", () => {
  const makeValidatorStub = (): IValidator => ({
    validate: resolveValue({ isValid: true, data: makeFakeUpdateUserInput() }),
  });

  const makeRepositoryStub = (): IUpdateUserRepository &
    IFindUsersRepository => ({
    ...makeFindUsersRepositoryStub(),
    update: resolveValue(makeFakeUser()),
  });

  const makeSUT = (
    validator: IValidator,
    repository: IUpdateUserRepository & IFindUsersRepository
  ) => new UpdateUserUseCase(validator, repository);

  let sut: ICreateUserUseCase;
  let validator: IValidator;
  let repository: IUpdateUserRepository & IFindUsersRepository;

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();

    validator.validate = jest
      .fn()
      .mockReturnValue({ isValid: true, data: makeFakeUpdateUserInput() });

    sut = makeSUT(validator, repository);
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute(makeFakeUpdateUserInput());
      expect(validator.validate).toBeCalledWith(makeFakeUpdateUserInput());
    });

    it("should continue method execution when validation succeeds", async () => {
      await sut.execute(makeFakeUpdateUserInput());

      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute(makeFakeUpdateUserInput())).rejects.toEqual(
        new ValidationError(["validation_error"])
      );
    });
  });

  describe("Dependency: Users Repository", () => {
    it("should call update() method from users repository with correct values", async () => {
      await sut.execute(makeFakeUpdateUserInput());
      expect(repository.update).toHaveBeenCalledWith(makeFakeUpdateUserInput());
    });

    it("should call findById() method from users repository with correct values", async () => {
      await sut.execute(makeFakeUpdateUserInput());
      expect(repository.findById).toHaveBeenCalledWith(
        makeFakeUpdateUserInput().id
      );
    });

    it("should throw a Validation Error when email already exists", async () => {
      repository.findById = resolveValueOnce(undefined);
      expect(sut.execute(makeFakeUpdateUserInput())).rejects.toThrow();
    });

    it("should throw an error when repository throws", async () => {
      repository.update = rejectValueOnce(new Error());
      expect(sut.execute(makeFakeUpdateUserInput())).rejects.toThrow(
        new Error()
      );
    });

    it("should return an UserModel instance when operations succeed", async () => {
      expect(sut.execute(makeFakeUpdateUserInput())).resolves.toEqual(
        makeFakeUser()
      );
    });
  });
});
