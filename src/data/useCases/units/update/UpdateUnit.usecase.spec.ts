import {
  makeFakeUnit,
  makeFakeUpdateUnitInput,
} from "src/__tests__/utils/UnitMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeFindUnitsRepositoryStub } from "src/__tests__/utils/typeORM/units/FindUnitsRepository.factory";

import { IUpdateUnitUseCase } from "src/domain/useCases/units/update/IUpdateUnit.interface";

import { UpdateUnitUseCase } from "./UpdateUnit.usecase";
import { IValidator } from "src/data/protocols//validation/Validator.interface";
import { IUpdateUnitRepository } from "../../../protocols/database/units/UpdateUnitRepository.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";
import { IUpdateUnitInput } from "src/domain/dto/units/IUpdateUnit.dto";

const makeValidatorStub = (): IValidator => ({
  validate: jest.fn(),
});

const makeRepositoryStub = (): IUpdateUnitRepository &
  IFindUnitsRepository => ({
  ...makeFindUnitsRepositoryStub(),
  findByName: resolveValue(undefined),
  update: resolveValue(makeFakeUnit()),
});

const makeSUT = (
  validator: IValidator,
  repository: IUpdateUnitRepository & IFindUnitsRepository
) => new UpdateUnitUseCase(validator, repository);

describe("Update Unit UseCase", () => {
  let sut: IUpdateUnitUseCase;
  let validator: IValidator;
  let repository: IUpdateUnitRepository & IFindUnitsRepository;

  const unitInput: IUpdateUnitInput = makeFakeUpdateUnitInput();

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();
    sut = makeSUT(validator, repository);

    validator.validate = jest.fn().mockReturnValue({
      isValid: true,
      data: makeFakeUpdateUnitInput(),
    });
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute(unitInput);
      expect(validator.validate).toBeCalledWith(unitInput);
    });

    it("should continue method execution when validation succeeds", async () => {
      await sut.execute(unitInput);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute(unitInput)).rejects.toEqual(
        new ValidationError(["validation_error"])
      );
    });
  });

  describe("Dependency: Units Repository", () => {
    it("should call update() method from units repository with correct values", async () => {
      await sut.execute(unitInput);
      expect(repository.update).toHaveBeenCalledWith(makeFakeUpdateUnitInput());
    });

    it("should call findById() method from units repository with correct values", async () => {
      await sut.execute(unitInput);
      expect(repository.findById).toHaveBeenCalledWith(unitInput.id);
    });

    it("should call findByName() method from units repository with correct values", async () => {
      await sut.execute(unitInput);
      expect(repository.findByName).toHaveBeenCalledWith(unitInput.name);
    });

    it("should throw a Not Found Error when unit ID is not found", async () => {
      repository.findById = resolveValueOnce(undefined);
      repository.findByName = resolveValueOnce(undefined);

      expect(sut.execute(unitInput)).rejects.toThrow(
        new NotFoundError(
          `Could not update: data related to ID unit_id not found`
        )
      );
    });

    it("should throw a Validation Error when name already exists", async () => {
      repository.findByName = resolveValueOnce(makeFakeUnit());

      expect(sut.execute(unitInput)).rejects.toThrow(
        new ValidationError([`'name' provided already in use`])
      );
    });

    it("should throw an error when repository throws", async () => {
      repository.update = rejectValueOnce(new Error());
      expect(sut.execute(unitInput)).rejects.toThrow(new Error());
    });

    it("should return an UnitModel instance when operations succeed", async () => {
      expect(sut.execute(unitInput)).resolves.toEqual(makeFakeUnit());
    });
  });
});
