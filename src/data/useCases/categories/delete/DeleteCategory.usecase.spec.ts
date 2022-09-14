import { makeFindCategoryRepositoryStub } from "src/__tests__/utils/typeORM/categories/FindCategoryRepository.factory";
import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { NotFoundError } from "src/errors/NotFound.error";

import { DeleteCategoryUseCase } from "./DeleteCategory.usecase";
import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";
import { IDeleteCategoryRepository } from "src/data/protocols/database/categories/DeleteCategoryRepository.interface";

import { IDeleteUnitUseCase } from "src/domain/useCases/units/delete/DeleteUnit.interface";

type Repository = IFindCategoryRepository & IDeleteCategoryRepository;
describe("Delete Category UseCase", () => {
  const categoryData = makeFakeCategory();
  let sut: IDeleteUnitUseCase;
  let repository: Repository;

  const makeRepositoryStub = (): Repository => ({
    ...makeFindCategoryRepositoryStub(),
    delete: resolveValue(true),
  });

  const makeSUT = (repository: Repository) =>
    new DeleteCategoryUseCase(repository);

  beforeEach(() => {
    repository = makeRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Categories Repository", () => {
    it("should call findById() method with correct values", async () => {
      await sut.execute(categoryData.id);
      expect(repository.findById).toHaveBeenCalledWith(categoryData.id);
    });

    it("should throw an error when repository throws", async () => {
      repository.findById = rejectValueOnce(new Error());
      expect(sut.execute(categoryData.id)).rejects.toThrow(new Error());
    });

    it("should throw a Not Found Error when repository returns undefined", async () => {
      repository.findById = resolveValueOnce(undefined);

      expect(sut.execute(categoryData.id)).rejects.toEqual(
        new NotFoundError(
          `Could not delete: data related to ID provided not found`
        )
      );
    });

    it("should call delete() with correct values", async () => {
      await sut.execute(categoryData.id);
      expect(repository.delete).toHaveBeenCalledWith(categoryData.id);
    });

    it("should return true when deletion succeeds", async () => {
      expect(sut.execute(categoryData.id)).resolves.toEqual(true);
    });
  });
});
