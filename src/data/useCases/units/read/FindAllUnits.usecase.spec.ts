import { makeFakeUnit } from "src/__tests__/utils/UnitMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindAllUnitsUseCase } from "src/domain/useCases/units/read/IFindAllUnits.interface";

import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";
import { FindAllUnitsUseCase } from "./FindAllUnits.usecase";

describe("Find All Units UseCase", () => {
  const makeRepositoryStub = (): IFindUnitsRepository => ({
    findAll: resolveValue([makeFakeUnit()]),
    findByName: resolveValue(makeFakeUnit()),
  });

  const makeSUT = (repository: IFindUnitsRepository): IFindAllUnitsUseCase =>
    new FindAllUnitsUseCase(repository);

  let sut: IFindAllUnitsUseCase;
  let repository: IFindUnitsRepository;

  beforeEach(() => {
    repository = makeRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Units Repository", () => {
    it("should call find() method from units repository with correct values", async () => {
      await sut.execute();
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when repository throws", async () => {
      repository.findAll = rejectValueOnce(new Error());
      expect(sut.execute()).rejects.toThrow(new Error());
    });

    it("should return an array of UnitModel instances when operations succeed", async () => {
      expect(sut.execute()).resolves.toEqual([makeFakeUnit()]);
    });
  });
});
