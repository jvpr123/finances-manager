import { makeFindCategoryRepositoryStub } from "src/__tests__/utils/typeORM/categories/FindCategoryRepository.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";
import {
  makeFakeCategory,
  makeFakeCreateCategoryInput,
} from "src/__tests__/utils/CategoryMocks.factory";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateCategoryRepository } from "src/data/protocols/database/categories/CreateCategoryRepository.interface";
import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";

import { CreateCategoryUseCase } from "./CreateCategory.usecase";

import { ValidationError } from "src/errors/Validation.error";

type IRepository = ICreateCategoryRepository & IFindCategoryRepository;

const makeValidatorStub = (): IValidator => ({
  validate: jest
    .fn()
    .mockReturnValue({ isValid: true, data: makeFakeCreateCategoryInput() }),
});

const makeRepositoryStub = (): IRepository => ({
  create: resolveValue(makeFakeCategory()),
  ...makeFindCategoryRepositoryStub(),
});

const makeSUT = (
  validator: IValidator,
  repository: IRepository
): CreateCategoryUseCase => new CreateCategoryUseCase(validator, repository);

describe("Create Category UseCase", () => {
  let sut: CreateCategoryUseCase;
  let validator: IValidator;
  let repository: IRepository;

  const inputData = makeFakeCreateCategoryInput();

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

  describe("Dependency: Categories Repository", () => {
    it("should call create() method from transactions repository with correct values", async () => {
      await sut.execute(inputData);
      expect(repository.create).toHaveBeenCalledWith(inputData);
    });

    it("should call findByTitle() method with correct values", async () => {
      await sut.execute(inputData);
      expect(repository.findByTitle).toHaveBeenCalledWith(inputData.title);
    });

    it("should throw a Validation Error when title provided already exists", async () => {
      repository.findByTitle = resolveValueOnce(makeFakeCategory());
      expect(sut.execute(inputData)).rejects.toThrow(
        new ValidationError(['"title" provided already in use'])
      );
    });

    it("should throw an error when repository throws", async () => {
      repository.create = rejectValueOnce(new Error());
      expect(sut.execute(inputData)).rejects.toThrow(new Error());
    });

    it("should return an CategoryModel instance when operations succeed", async () => {
      expect(sut.execute(inputData)).resolves.toEqual(makeFakeCategory());
    });
  });
});
