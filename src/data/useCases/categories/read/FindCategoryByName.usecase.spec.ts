import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";
import { makeFindCategoryRepositoryStub } from "src/__tests__/utils/typeORM/categories/FindCategoryRepository.factory";
import {
  rejectValueOnce,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";

import { IFindCategoryByTitleUseCase } from "src/domain/useCases/categories/read/FindCategoryByTitle.interface";

import { NotFoundError } from "src/errors/NotFound.error";
import { FindCategoryByTitleUseCase } from "./FindCategoryByName.usecase";

describe("Find Category By Name UseCase", () => {
  const makeSUT = (
    repository: IFindCategoryRepository
  ): IFindCategoryByTitleUseCase => new FindCategoryByTitleUseCase(repository);

  let sut: IFindCategoryByTitleUseCase;
  let repository: IFindCategoryRepository;

  beforeEach(() => {
    repository = makeFindCategoryRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Category Repository", () => {
    it("should call findByTitle() method from units repository with correct values", async () => {
      await sut.execute("category_name");
      expect(repository.findByTitle).toHaveBeenCalledWith("category_name");
    });

    it("should throw an error when repository throws", async () => {
      repository.findByTitle = rejectValueOnce(new Error());
      expect(sut.execute("category_name")).rejects.toThrow(new Error());
    });

    it("should throw a Not Found error when repository returns undefined", async () => {
      repository.findByTitle = resolveValueOnce(undefined);
      expect(sut.execute("not_exist_unit")).rejects.toThrow(
        new NotFoundError(
          `Could not find data related to not_exist_unit category`
        )
      );
    });

    it("should return an CategoryModel instance when operations succeed", async () => {
      expect(sut.execute("category_name")).resolves.toEqual(makeFakeCategory());
    });
  });
});
