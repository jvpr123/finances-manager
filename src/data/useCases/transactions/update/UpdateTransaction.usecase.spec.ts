import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";
import {
  makeFakeTransaction,
  makeFakeUpdateTransactionInput,
} from "src/__tests__/utils/TransactionMocks.factory";
import { makeFindTransactionsRepositoryStub } from "src/__tests__/utils/typeORM/transactions/FindTransactionsRepository.factory";

import { IUpdateTransactionUseCase } from "src/domain/useCases/transactions/update/UpdateTransaction.interface";
import { IUpdateTransactionInput } from "src/domain/dto/transactions/UpdateTransaction.dto";

import { UpdateTransactionUseCase } from "./UpdateTransaction.usecase";
import { IValidator } from "src/data/protocols//validation/Validator.interface";
import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";
import { IUpdateTransactionRepository } from "src/data/protocols/database/transactions/UpdateTransactionRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

type Repository = IFindTransactionsRepository & IUpdateTransactionRepository;

const makeValidatorStub = (): IValidator => ({
  validate: jest.fn(),
});

const makeRepositoryStub = (): Repository => ({
  ...makeFindTransactionsRepositoryStub(),
  update: resolveValue(makeFakeTransaction(150)),
});

const makeSUT = (validator: IValidator, repository: Repository) =>
  new UpdateTransactionUseCase(validator, repository);

describe("Update Transaction UseCase", () => {
  let sut: IUpdateTransactionUseCase;
  let validator: IValidator;
  let repository: Repository;

  const transactionInput: IUpdateTransactionInput =
    makeFakeUpdateTransactionInput(150);

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();
    sut = makeSUT(validator, repository);

    validator.validate = jest.fn().mockReturnValue({
      isValid: true,
      data: transactionInput,
    });
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute(transactionInput);
      expect(validator.validate).toBeCalledWith(transactionInput);
    });

    it("should continue method execution when validation succeeds", async () => {
      await sut.execute(transactionInput);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute(transactionInput)).rejects.toEqual(
        new ValidationError(["validation_error"])
      );
    });
  });

  describe("Dependency: Transactions Repository", () => {
    it("should call update() method with correct values", async () => {
      await sut.execute(transactionInput);
      expect(repository.update).toHaveBeenCalledWith(transactionInput);
    });

    it("should call findById() method with correct values", async () => {
      await sut.execute(transactionInput);
      expect(repository.findById).toHaveBeenCalledWith(transactionInput.id);
    });

    it("should throw a Not Found Error when unit ID is not found", async () => {
      repository.findById = resolveValueOnce(undefined);

      expect(sut.execute(transactionInput)).rejects.toThrow(
        new NotFoundError(
          `Could not update: data related to ID provided not found`
        )
      );
    });

    it("should throw an error when repository throws", async () => {
      repository.update = rejectValueOnce(new Error());
      expect(sut.execute(transactionInput)).rejects.toThrow(new Error());
    });

    it("should return an UnitModel instance when operations succeed", async () => {
      expect(sut.execute(transactionInput)).resolves.toEqual(
        makeFakeTransaction(150)
      );
    });
  });
});
