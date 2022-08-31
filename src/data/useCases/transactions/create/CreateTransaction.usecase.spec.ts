import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";
import {
  makeFakeCreateTransactionDto,
  makeFakeTransaction,
} from "src/__tests__/utils/TransactionMocks.factory";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateTransactionRepository } from "src/data/protocols/database/transactions/CreateTransactionRepository.interface";

import { CreateTransactionUseCase } from "./CreateTransaction.usecase";

import { ValidationError } from "src/errors/Validation.error";

const makeValidatorStub = (): IValidator => ({
  validate: jest
    .fn()
    .mockReturnValue({ isValid: true, data: makeFakeCreateTransactionDto() }),
});

const makeRepositoryStub = (): ICreateTransactionRepository => ({
  create: resolveValue(makeFakeTransaction()),
});

const makeSUT = (
  validator: IValidator,
  repository: ICreateTransactionRepository
): CreateTransactionUseCase =>
  new CreateTransactionUseCase(validator, repository);

describe("Create Transaction UseCase", () => {
  let sut: CreateTransactionUseCase;
  let validator: IValidator;
  let repository: ICreateTransactionRepository;

  const inputData = makeFakeCreateTransactionDto();

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();
    sut = makeSUT(validator, repository);
  });

  describe("Dependency: Validator", () => {
    it("should call validator with correct values", async () => {
      sut.execute(inputData);
      expect(validator.validate).toBeCalledWith(inputData);
    });

    it("should continue execution when validation succeeds", async () => {
      sut.execute(inputData);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["Validation failed"],
      });

      expect(sut.execute(inputData)).rejects.toEqual(
        new ValidationError(["Validation failed"])
      );
    });
  });

  describe("Dependency: Transactions Repository", () => {
    it("should call create() method from transactions repository with correct values", async () => {
      await sut.execute(inputData);
      expect(repository.create).toHaveBeenCalledWith(inputData);
    });

    it("should throw an error when repository throws", async () => {
      repository.create = rejectValueOnce(new Error());
      expect(sut.execute(inputData)).rejects.toThrow(new Error());
    });

    it("should return an TransactionModel instance when operations succeed", async () => {
      expect(sut.execute(inputData)).resolves.toEqual(makeFakeTransaction());
    });
  });
});
