import { makeFindUsersRepositoryStub } from "src/__tests__/utils/typeORM/users/FindUsersRepository.factory";
import {
  makeFakeCreateUnitDto,
  makeFakeCreateUnitInput,
} from "src/__tests__/utils/UnitMocks.factory";
import { makeFakeUnit } from "src/__tests__/utils/UnitMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";
import { ICreateUnitRepository } from "src/data/protocols/database/units/CreateUnitRepository.interface";
import { CreateUnitUseCase } from "./CreateUnit.usecase";

import { ICreateUnitUseCase } from "src/domain/useCases/units/create/ICreateUnit.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

const makeValidatorStub = (): IValidator => ({
  validate: jest.fn(),
});

const makeUnitsRepositoryStub = (): ICreateUnitRepository => ({
  create: resolveValue(makeFakeUnit()),
});

const makeSUT = (
  validator: IValidator,
  usersRepository: IFindUsersRepository,
  unitsRepository: ICreateUnitRepository
): ICreateUnitUseCase =>
  new CreateUnitUseCase(validator, usersRepository, unitsRepository);

describe("Create Unit UseCase", () => {
  let sut: ICreateUnitUseCase;
  let validator: IValidator;
  let unitsRepository: ICreateUnitRepository;
  let usersRepository: IFindUsersRepository;

  const unitInput = makeFakeCreateUnitInput();
  const unitDto = makeFakeCreateUnitDto();

  beforeEach(() => {
    validator = makeValidatorStub();
    usersRepository = makeFindUsersRepositoryStub();
    unitsRepository = makeUnitsRepositoryStub();
    sut = makeSUT(validator, usersRepository, unitsRepository);

    validator.validate = jest
      .fn()
      .mockReturnValue({ isValid: true, data: unitInput });
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute(unitInput);
      expect(validator.validate).toBeCalledWith(unitInput);
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
    it("should call findById() method from users repository with correct values", async () => {
      await sut.execute(unitInput);
      expect(usersRepository.findById).toHaveBeenCalledWith(unitInput.ownerId);
    });

    it("should throw a NotFoundError if owner is not found", async () => {
      usersRepository.findById = resolveValueOnce(undefined);

      expect(sut.execute(unitInput)).rejects.toThrow(
        new NotFoundError(
          "Could not create: Owner data related to ID provided not found"
        )
      );
    });

    it("should call create() method from units repository with correct values", async () => {
      await sut.execute(unitInput);
      expect(unitsRepository.create).toHaveBeenCalledWith(unitDto);
    });

    it("should throw an error when units repository throws", async () => {
      unitsRepository.create = rejectValueOnce(new Error());
      expect(sut.execute(unitInput)).rejects.toThrow(new Error());
    });

    it("should return an UnitModel instance when operations succeed", async () => {
      expect(sut.execute(unitInput)).resolves.toEqual(makeFakeUnit());
    });
  });
});
