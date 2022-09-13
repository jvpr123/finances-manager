import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";
import { makeFindCategoryRepositoryStub } from "src/__tests__/utils/typeORM/categories/FindCategoryRepository.factory";
import {
  rejectValueOnce,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindAllCategoriesUseCase } from "src/domain/useCases/categories/read/FindAllCategories.interface";

import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";
import { FindAllCategoriesUseCase } from "./FindAllCategories.usecase";

describe("FindAllCategories UseCase", () => {
  const makeSUT = (
    repository: IFindCategoryRepository
  ): IFindAllCategoriesUseCase => new FindAllCategoriesUseCase(repository);

  let sut: IFindAllCategoriesUseCase;
  let repository: IFindCategoryRepository;

  beforeEach(() => {
    repository = makeFindCategoryRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Category Repository", () => {
    it("should call findAll() method from categories repository with correct values", async () => {
      await sut.execute();
      expect(repository.findAll).toHaveBeenCalledWith();
    });

    it("should throw an error when repository throws", async () => {
      repository.findAll = rejectValueOnce(new Error());
      expect(sut.execute()).rejects.toThrow(new Error());
    });

    it("should return an empty array when no category is registered", async () => {
      repository.findAll = resolveValueOnce([]);
      expect(sut.execute()).resolves.toEqual([]);
    });

    it("should return an array of CategoryModel instances when operations succeed", async () => {
      expect(sut.execute()).resolves.toEqual([makeFakeCategory()]);
    });
  });
});
