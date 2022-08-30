import { makeFindUnitsRepositoryStub } from "src/__tests__/utils/typeORM/units/FindUnitsRepository.factory";
import { makeFakeUnit } from "src/__tests__/utils/UnitMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { NotFoundError } from "src/errors/NotFound.error";

import { DeleteUnitUseCase } from "./DeleteUnit.usecase";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";
import { IDeleteUnitRepository } from "src/data/protocols/database/units/DeleteUnitRepository.interface";

import { IDeleteUnitUseCase } from "src/domain/useCases/units/delete/DeleteUnit.interface";

type Repository = IFindUnitsRepository & IDeleteUnitRepository;
describe("Delete Unit UseCase", () => {
  const unit = makeFakeUnit();
  let sut: IDeleteUnitUseCase;
  let repository: Repository;

  const makeRepositoryStub = (): Repository => ({
    ...makeFindUnitsRepositoryStub(),
    delete: resolveValue(true),
  });

  const makeSUT = (repository: Repository) => new DeleteUnitUseCase(repository);

  beforeEach(() => {
    repository = makeRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Units Repository", () => {
    it("should call findById() method from units repository with correct values", async () => {
      await sut.execute(unit.id);
      expect(repository.findById).toHaveBeenCalledWith(unit.id);
    });

    it("should throw an error when repository throws", async () => {
      repository.findById = rejectValueOnce(new Error());
      expect(sut.execute(unit.id)).rejects.toThrow(new Error());
    });

    it("should throw a Not Found Error when repository returns undefined", async () => {
      repository.findById = resolveValueOnce(undefined);

      expect(sut.execute(unit.id)).rejects.toEqual(
        new NotFoundError(
          `Could not delete: data related to ID provided not found`
        )
      );
    });

    it("should call delete() method from units repository with correct values", async () => {
      await sut.execute(unit.id);
      expect(repository.delete).toHaveBeenCalledWith(unit.id);
    });

    it("should return true when deletion succeeds", async () => {
      expect(sut.execute(unit.id)).resolves.toEqual(true);
    });
  });
});
