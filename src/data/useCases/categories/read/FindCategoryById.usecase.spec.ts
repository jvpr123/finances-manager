import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";
import { makeFindCategoryRepositoryStub } from "src/__tests__/utils/typeORM/categories/FindCategoryRepository.factory";
import {
  rejectValueOnce,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";

import { IFindCategoryByIdUseCase } from "src/domain/useCases/categories/read/FindCategoryById.interface";

import { NotFoundError } from "src/errors/NotFound.error";
import { FindCategoryByIdUseCase } from "./FindCategoryById.usecase";

describe("FindCategoryById UseCase", () => {
  const makeSUT = (
    repository: IFindCategoryRepository
  ): IFindCategoryByIdUseCase => new FindCategoryByIdUseCase(repository);

  let sut: IFindCategoryByIdUseCase;
  let repository: IFindCategoryRepository;

  beforeEach(() => {
    repository = makeFindCategoryRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Category Repository", () => {
    it("should call findById() method from units repository with correct values", async () => {
      await sut.execute("category_id");
      expect(repository.findById).toHaveBeenCalledWith("category_id");
    });

    it("should throw an error when repository throws", async () => {
      repository.findById = rejectValueOnce(new Error());
      expect(sut.execute("category_id")).rejects.toThrow(new Error());
    });

    it("should throw a Not Found error when repository returns undefined", async () => {
      repository.findById = resolveValueOnce(undefined);
      expect(sut.execute("not_exist_category")).rejects.toThrow(
        new NotFoundError(`Could not find data related to category ID provided`)
      );
    });

    it("should return an CategoryModel instance when operations succeed", async () => {
      expect(sut.execute("category_id")).resolves.toEqual(makeFakeCategory());
    });
  });
});
