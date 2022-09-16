import {
  makeFakeCreateTagInput,
  makeFakeTag,
} from "src/__tests__/utils/TagMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateTagRepository } from "src/data/protocols/database/tags/CreateTagRepository.interface";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";

import { CreateTagUseCase } from "./CreateTag.usecase";

import { ValidationError } from "src/errors/Validation.error";
import { makeFindTagsRepositoryStub } from "src/__tests__/utils/typeORM/tags/FindTagsRepository.factory";

type IRepository = ICreateTagRepository & IFindTagsRepository;

const makeValidatorStub = (): IValidator => ({
  validate: jest
    .fn()
    .mockReturnValue({ isValid: true, data: makeFakeCreateTagInput() }),
});

const makeRepositoryStub = (): IRepository => ({
  create: resolveValue(makeFakeTag()),
  ...makeFindTagsRepositoryStub(),
});

const makeSUT = (
  validator: IValidator,
  repository: IRepository
): CreateTagUseCase => new CreateTagUseCase(validator, repository);

describe("Create Tag UseCase", () => {
  let sut: CreateTagUseCase;
  let validator: IValidator;
  let repository: IRepository;

  const inputData = makeFakeCreateTagInput();

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();
    sut = makeSUT(validator, repository);
  });

  describe("Dependency: Validator", () => {
    it("should call validator with correct values", async () => {
      sut.execute(inputData);
      expect(validator.validate).toBeCalledWith(inputData);
    });

    it("should throw an error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["Validation failed"],
      });

      expect(sut.execute(inputData)).rejects.toEqual(
        new ValidationError(["Validation failed"])
      );
    });
  });

  describe("Dependency: Tags Repository", () => {
    it("should call create() method from tags repository with correct values", async () => {
      await sut.execute(inputData);
      expect(repository.create).toHaveBeenCalledWith(inputData);
    });

    it("should call findByTitle() method with correct values", async () => {
      await sut.execute(inputData);
      expect(repository.findByTitle).toHaveBeenCalledWith(inputData.title);
    });

    it("should throw a Validation Error when title provided already exists", async () => {
      repository.findByTitle = resolveValueOnce(makeFakeTag());
      expect(sut.execute(inputData)).rejects.toThrow(
        new ValidationError(['"title" provided already in use'])
      );
    });

    it("should throw an error when repository throws", async () => {
      repository.create = rejectValueOnce(new Error());
      expect(sut.execute(inputData)).rejects.toThrow(new Error());
    });

    it("should return an TagModel instance when operations succeed", async () => {
      expect(sut.execute(inputData)).resolves.toEqual(makeFakeTag());
    });
  });
});
