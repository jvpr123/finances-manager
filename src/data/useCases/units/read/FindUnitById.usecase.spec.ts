import { makeFakeUnit } from "src/__tests__/utils/UnitMocks.factory";
import { makeFindUnitsRepositoryStub } from "src/__tests__/utils/typeORM/units/FindUnitsRepository.factory";
import {
  rejectValueOnce,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";
import { FindUnitByIdUseCase } from "./FindUnitById.usecase";

import { IFindUnitByIdUseCase } from "src/domain/useCases/units/read/IFindUnitById.interface";

import { NotFoundError } from "src/errors/NotFound.error";

describe("Find Unit By ID UseCase", () => {
  const makeSUT = (repository: IFindUnitsRepository): IFindUnitByIdUseCase =>
    new FindUnitByIdUseCase(repository);

  let sut: IFindUnitByIdUseCase;
  let repository: IFindUnitsRepository;

  beforeEach(() => {
    repository = makeFindUnitsRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Units Repository", () => {
    it("should call findById() method from units repository with correct values", async () => {
      await sut.execute("unit_id");
      expect(repository.findById).toHaveBeenCalledWith("unit_id");
    });

    it("should throw an error when repository throws", async () => {
      repository.findById = rejectValueOnce(new Error());
      expect(sut.execute("unit_id")).rejects.toThrow(new Error());
    });

    it("should throw a Not Found error when repository returns undefined", async () => {
      repository.findById = resolveValueOnce(undefined);
      expect(sut.execute("invalid_id")).rejects.toThrow(
        new NotFoundError(`Could not find data related to invalid_id unit ID`)
      );
    });

    it("should return an UnitModel instance when operations succeed", async () => {
      expect(sut.execute("unit_id")).resolves.toEqual(makeFakeUnit());
    });
  });
});
