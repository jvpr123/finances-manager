import { makeFindUnitsRepositoryStub } from "src/__tests__/utils/typeORM/units/FindUnitsRepository.factory";
import { makeFindCategoryRepositoryStub } from "src/__tests__/utils/typeORM/categories/FindCategoryRepository.factory";
import { makeFindTagsRepositoryStub } from "src/__tests__/utils/typeORM/tags/FindTagsRepository.factory";
import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";
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
import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
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
  categoriesRepository: IFindCategoryRepository,
  tagsRepository: IFindTagsRepository,
  transactionsRepository: ICreateTransactionRepository
): CreateTransactionUseCase =>
  new CreateTransactionUseCase(
    validator,
    unitsRepository,
    categoriesRepository,
    tagsRepository,
    transactionsRepository
  );

describe("Create Transaction UseCase", () => {
  let sut: CreateTransactionUseCase;
  let validator: IValidator;
  let unitsRepository: IFindUnitsRepository;
  let categoriesRepository: IFindCategoryRepository;
  let tagsRepository: IFindTagsRepository;
  let transactionsRepository: ICreateTransactionRepository;

  const inputData = makeFakeCreateTransactionInput();

  beforeEach(() => {
    validator = makeValidatorStub();
    unitsRepository = makeFindUnitsRepositoryStub();
    categoriesRepository = makeFindCategoryRepositoryStub();
    tagsRepository = makeFindTagsRepositoryStub();
    transactionsRepository = makeRepositoryStub();

    sut = makeSUT(
      validator,
      unitsRepository,
      categoriesRepository,
      tagsRepository,
      transactionsRepository
    );
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

  describe("Dependency: Units Repository", () => {
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
  });

  describe("Dependency: Categories Repository", () => {
    it("should call findById() method from categories repository with correct values", async () => {
      await sut.execute(inputData);
      expect(categoriesRepository.findById).toHaveBeenCalledWith(
        inputData.categoryId
      );
    });

    it("should throw a NotFoundError if category is not found", async () => {
      categoriesRepository.findById = resolveValueOnce(undefined);

      expect(sut.execute(inputData)).rejects.toThrow(
        new NotFoundError(
          "Could not create: Category data related to ID provided not found"
        )
      );
    });
  });

  describe("Dependency: Tags Repository", () => {
    it("should call findById() method from tags repository with correct values", async () => {
      await sut.execute(inputData);
      expect(tagsRepository.findById).toHaveBeenCalledWith(inputData.tagsId[0]);
    });

    it("should throw a NotFoundError if at least one tag is not found", async () => {
      categoriesRepository.findById = resolveValueOnce(makeFakeCategory());
      tagsRepository.findById = resolveValueOnce(undefined);

      expect(sut.execute(inputData)).rejects.toThrow(
        new NotFoundError(
          `Could not create: some tags provided were not found: ${inputData.tagsId[0]}`
        )
      );
    });
  });

  describe("Dependency: Transactions Repository", () => {
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
