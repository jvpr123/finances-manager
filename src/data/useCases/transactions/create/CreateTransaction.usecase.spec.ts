import { makeFindUnitsRepositoryStub } from "src/__tests__/utils/typeORM/units/FindUnitsRepository.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";
import {
  makeFakeCreateTransactionDto,
  makeFakeCreateTransactionInput,
  makeFakeTransaction,
} from "src/__tests__/utils/TransactionMocks.factory";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";
import { ICreateTransactionRepository } from "src/data/protocols/database/transactions/CreateTransactionRepository.interface";

import { CreateTransactionUseCase } from "./CreateTransaction.usecase";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

const makeValidatorStub = (): IValidator => ({
  validate: jest
    .fn()
    .mockReturnValue({ isValid: true, data: makeFakeCreateTransactionInput() }),
});

const makeRepositoryStub = (): ICreateTransactionRepository => ({
  create: resolveValue(makeFakeTransaction()),
});

const makeSUT = (
  validator: IValidator,
  unitsRepository: IFindUnitsRepository,
  transactionsRepository: ICreateTransactionRepository
): CreateTransactionUseCase =>
  new CreateTransactionUseCase(
    validator,
    unitsRepository,
    transactionsRepository
  );

describe("Create Transaction UseCase", () => {
  let sut: CreateTransactionUseCase;
  let validator: IValidator;
  let unitsRepository: IFindUnitsRepository;
  let transactionsRepository: ICreateTransactionRepository;

  const inputData = makeFakeCreateTransactionInput();

  beforeEach(() => {
    validator = makeValidatorStub();
    unitsRepository = makeFindUnitsRepositoryStub();
    transactionsRepository = makeRepositoryStub();

    sut = makeSUT(validator, unitsRepository, transactionsRepository);
  });

  describe("Dependency: Validator", () => {
    it("should call validator with correct values", async () => {
      sut.execute(inputData);
      expect(validator.validate).toBeCalledWith(inputData);
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
    it("should call findById() method from units repository with correct values", async () => {
      await sut.execute(inputData);
      expect(unitsRepository.findById).toHaveBeenCalledWith(inputData.unitId);
    });

    it("should throw a NotFoundError if unit is not found", async () => {
      unitsRepository.findById = resolveValueOnce(undefined);

      expect(sut.execute(inputData)).rejects.toThrow(
        new NotFoundError(
          "Could not create: Unit data related to ID provided not found"
        )
      );
    });

    it("should call create() method from transactions repository with correct values", async () => {
      await sut.execute(inputData);
      expect(transactionsRepository.create).toHaveBeenCalledWith(
        makeFakeCreateTransactionDto()
      );
    });

    it("should throw an error when repository throws", async () => {
      transactionsRepository.create = rejectValueOnce(new Error());
      expect(sut.execute(inputData)).rejects.toThrow(new Error());
    });

    it("should return an TransactionModel instance when operations succeed", async () => {
      expect(sut.execute(inputData)).resolves.toEqual(makeFakeTransaction());
    });
  });
});
