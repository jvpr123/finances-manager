import { makeFakeCreateUnitDto } from "src/__tests__/utils/UnitMocks.factory";
import { makeFakeUnit } from "src/__tests__/utils/UnitMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateUnitRepository } from "src/data/protocols/database/units/CreateUnitRepository.interface";
import { CreateUnitUseCase } from "./CreateUnit.usecase";

import { ICreateUnitUseCase } from "src/domain/useCases/units/create/ICreateUnit.interface";

import { ValidationError } from "src/errors/Validation.error";

describe("Create Unit UseCase", () => {
  const makeValidatorStub = (): IValidator => ({
    validate: jest.fn(),
  });

  const makeRepositoryStub = (): ICreateUnitRepository => ({
    create: resolveValue(makeFakeUnit()),
  });

  const makeSUT = (
    validator: IValidator,
    repository: ICreateUnitRepository
  ): ICreateUnitUseCase => new CreateUnitUseCase(validator, repository);

  let sut: ICreateUnitUseCase;
  let validator: IValidator;
  let repository: ICreateUnitRepository;

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();
    sut = makeSUT(validator, repository);

    validator.validate = jest
      .fn()
      .mockReturnValue({ isValid: true, data: makeFakeCreateUnitDto() });
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute(makeFakeCreateUnitDto());
      expect(validator.validate).toBeCalledWith(makeFakeCreateUnitDto());
    });

    it("should continue method execution when validation succeeds", async () => {
      await sut.execute(makeFakeCreateUnitDto());
      expect(repository.create).toHaveBeenCalledTimes(1);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute(makeFakeCreateUnitDto())).rejects.toEqual(
        new ValidationError(["validation_error"])
      );
    });
  });

  describe("Dependency: Units Repository", () => {
    it("should call create() method from units repository with correct values", async () => {
      await sut.execute(makeFakeCreateUnitDto());
      expect(repository.create).toHaveBeenCalledWith({
        ...makeFakeCreateUnitDto(),
        currentBalance: 0,
      });
    });

    // it("should call findByEmail() method from users repository with correct values", async () => {
    //   await sut.execute(makeFakeCreateUnitDto());
    //   expect(repository.findByEmail).toHaveBeenCalledWith(
    //     makeFakeCreateUnitDto().email
    //   );
    // });

    // it("should throw a Validation Error when email already exists", async () => {
    //   repository.findByEmail = resolveValueOnce(makeFakeUser());
    //   expect(sut.execute(makeFakeCreateUnitDto())).rejects.toThrow();
    // });

    it("should throw an error when repository throws", async () => {
      repository.create = rejectValueOnce(new Error());
      expect(sut.execute(makeFakeCreateUnitDto())).rejects.toThrow(new Error());
    });

    it("should return an UnitModel instance when operations succeed", async () => {
      expect(sut.execute(makeFakeCreateUnitDto())).resolves.toEqual(
        makeFakeUnit()
      );
    });
  });
});
