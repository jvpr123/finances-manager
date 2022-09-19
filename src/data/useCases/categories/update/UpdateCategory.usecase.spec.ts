import { makeFindCategoryRepositoryStub } from "src/__tests__/utils/typeORM/categories/FindCategoryRepository.factory";
import {
  makeFakeCategory,
  makeFakeUpdateCategoryInput,
} from "src/__tests__/utils/CategoryMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IUpdateCategoryInput } from "src/domain/dto/categories/UpdateCategory.dto";
import { IUpdateCategoryUseCase } from "src/domain/useCases/categories/update/UpdateCategory.interface";

import { UpdateCategoryUseCase } from "./UpdateCategory.usecase";
import { IValidator } from "src/data/protocols//validation/Validator.interface";
import { IUpdateCategoryRepository } from "src/data/protocols/database/categories/UpdateCategoryRepository.interface";
import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

type IRepository = IUpdateCategoryRepository & IFindCategoryRepository;

const makeValidatorStub = (): IValidator => ({
  validate: jest.fn(),
});

const makeRepositoryStub = (): IRepository => ({
  ...makeFindCategoryRepositoryStub(),
  update: resolveValue(makeFakeCategory()),
});

const makeSUT = (validator: IValidator, repository: IRepository) =>
  new UpdateCategoryUseCase(validator, repository);

describe("Update Category UseCase", () => {
  let sut: IUpdateCategoryUseCase;
  let validator: IValidator;
  let repository: IRepository;

  const categoryInput: IUpdateCategoryInput = makeFakeUpdateCategoryInput();

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();
    sut = makeSUT(validator, repository);

    validator.validate = jest.fn().mockReturnValue({
      isValid: true,
      data: makeFakeUpdateCategoryInput(),
    });
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute(categoryInput);
      expect(validator.validate).toBeCalledWith(categoryInput);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute(categoryInput)).rejects.toEqual(
        new ValidationError(["validation_error"])
      );
    });
  });

  describe("Dependency: Categories Repository", () => {
    it("should call update() method from categories repository with correct values", async () => {
      await sut.execute(categoryInput);
      expect(repository.update).toHaveBeenCalledWith(categoryInput);
    });

    it("should call findById() method from categories repository with correct values", async () => {
      await sut.execute(categoryInput);
      expect(repository.findById).toHaveBeenCalledWith(categoryInput.id);
    });

    it("should call findByTitle() method from categories repository with correct values", async () => {
      await sut.execute(categoryInput);
      expect(repository.findByTitle).toHaveBeenCalledWith(categoryInput.title);
    });

    it("should throw a Not Found Error when category ID is not found", async () => {
      repository.findById = resolveValueOnce(undefined);
      repository.findByTitle = resolveValueOnce(undefined);

      expect(sut.execute(categoryInput)).rejects.toThrow(
        new NotFoundError(
          `Could not update: data related to ID provided not found`
        )
      );
    });

    it("should throw a Validation Error when name already exists", async () => {
      repository.findByTitle = resolveValueOnce(makeFakeCategory());

      expect(sut.execute(categoryInput)).rejects.toThrow(
        new ValidationError([`'title' provided already in use`])
      );
    });

    it("should throw an error when repository throws", async () => {
      repository.update = rejectValueOnce(new Error());
      expect(sut.execute(categoryInput)).rejects.toThrow(new Error());
    });

    it("should return an CategoryModel instance when operations succeed", async () => {
      expect(sut.execute(categoryInput)).resolves.toEqual(makeFakeCategory());
    });
  });
});
