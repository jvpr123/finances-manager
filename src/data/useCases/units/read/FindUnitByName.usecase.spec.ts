import { makeFakeUnit } from "src/__tests__/utils/UnitMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";

import { IFindUnitByNameUseCase } from "src/domain/useCases/units/read/IFindUnitByName.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";
import { FindUnitByNameUseCase } from "./FindUnitByName.usecase";

describe("Find Unit By Name UseCase", () => {
  const makeValidatorStub = (): IValidator => ({
    validate: jest.fn(),
  });

  const makeRepositoryStub = (): IFindUnitsRepository => ({
    findAll: resolveValue([makeFakeUnit()]),
    findByName: resolveValue(makeFakeUnit()),
  });

  const makeSUT = (
    validator: IValidator,
    repository: IFindUnitsRepository
  ): IFindUnitByNameUseCase => new FindUnitByNameUseCase(validator, repository);

  let sut: IFindUnitByNameUseCase;
  let validator: IValidator;
  let repository: IFindUnitsRepository;

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();
    sut = makeSUT(validator, repository);

    validator.validate = jest
      .fn()
      .mockReturnValue({ isValid: true, data: { name: "unit_name" } });
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute("unit_name ");
      expect(validator.validate).toBeCalledWith({ name: "unit_name " });
    });

    it("should continue method execution when validation succeeds", async () => {
      await sut.execute("unit_name");
      expect(repository.findByName).toHaveBeenCalledTimes(1);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute("invalid_input")).rejects.toEqual(
        new ValidationError(["validation_error"])
      );
    });
  });

  describe("Dependency: Units Repository", () => {
    it("should call findByName() method from units repository with correct values", async () => {
      await sut.execute("unit_name");
      expect(repository.findByName).toHaveBeenCalledWith("unit_name");
    });

    it("should throw an error when repository throws", async () => {
      repository.findByName = rejectValueOnce(new Error());
      expect(sut.execute("unit_name")).rejects.toThrow(new Error());
    });

    it("should throw a Not Found error when repository returns undefined", async () => {
      repository.findByName = resolveValueOnce(undefined);
      expect(sut.execute("not_exist_unit")).rejects.toThrow(
        new NotFoundError(`Could not find data related to not_exist_unit unit`)
      );
    });

    it("should return an UnitModel instance when operations succeed", async () => {
      expect(sut.execute("unit_name")).resolves.toEqual(makeFakeUnit());
    });
  });
});
