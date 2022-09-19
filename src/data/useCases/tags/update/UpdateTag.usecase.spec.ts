import { makeFindTagsRepositoryStub } from "src/__tests__/utils/typeORM/tags/FindTagsRepository.factory";
import {
  makeFakeTag,
  makeFakeUpdateTagInput,
} from "src/__tests__/utils/TagMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IUpdateCategoryInput } from "src/domain/dto/categories/UpdateCategory.dto";
import { IUpdateTagUseCase } from "src/domain/useCases/tags/update/UpdateTag.interface";

import { UpdateTagUseCase } from "./UpdateTag.usecase";
import { IValidator } from "src/data/protocols//validation/Validator.interface";
import { IUpdateTagRepository } from "src/data/protocols/database/tags/UpdateTagRepository.interface";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

type IRepository = IUpdateTagRepository & IFindTagsRepository;

const makeValidatorStub = (): IValidator => ({
  validate: jest.fn(),
});

const makeRepositoryStub = (): IRepository => ({
  ...makeFindTagsRepositoryStub(),
  update: resolveValue(makeFakeTag()),
});

const makeSUT = (validator: IValidator, repository: IRepository) =>
  new UpdateTagUseCase(validator, repository);

describe("Update Tag UseCase", () => {
  let sut: IUpdateTagUseCase;
  let validator: IValidator;
  let repository: IRepository;

  const tagInput: IUpdateCategoryInput = makeFakeUpdateTagInput();

  beforeEach(() => {
    validator = makeValidatorStub();
    repository = makeRepositoryStub();
    sut = makeSUT(validator, repository);

    validator.validate = jest.fn().mockReturnValue({
      isValid: true,
      data: makeFakeUpdateTagInput(),
    });
  });

  describe("Dependency: Validator", () => {
    it("should call validate() method from validator with correct values", async () => {
      await sut.execute(tagInput);
      expect(validator.validate).toBeCalledWith(tagInput);
    });

    it("should throw a Validation Error when validation fails", async () => {
      validator.validate = resolveValueOnce({
        isValid: false,
        data: ["validation_error"],
      });

      expect(sut.execute(tagInput)).rejects.toEqual(
        new ValidationError(["validation_error"])
      );
    });
  });

  describe("Dependency: Tags Repository", () => {
    it("should call update() method from tags repository with correct values", async () => {
      await sut.execute(tagInput);
      expect(repository.update).toHaveBeenCalledWith(tagInput);
    });

    it("should call findById() method from units repository with correct values", async () => {
      await sut.execute(tagInput);
      expect(repository.findById).toHaveBeenCalledWith(tagInput.id);
    });

    it("should call findByTitle() method from tags repository with correct values", async () => {
      await sut.execute(tagInput);
      expect(repository.findByTitle).toHaveBeenCalledWith(tagInput.title);
    });

    it("should throw a Not Found Error when tag ID is not found", async () => {
      repository.findById = resolveValueOnce(undefined);
      repository.findByTitle = resolveValueOnce(undefined);

      expect(sut.execute(tagInput)).rejects.toThrow(
        new NotFoundError(
          `Could not update: data related to ID provided not found`
        )
      );
    });

    it("should throw a Validation Error when title already exists", async () => {
      repository.findByTitle = resolveValueOnce(makeFakeTag());

      expect(sut.execute(tagInput)).rejects.toThrow(
        new ValidationError([`'title' provided already in use`])
      );
    });

    it("should throw an error when repository throws", async () => {
      repository.update = rejectValueOnce(new Error());
      expect(sut.execute(tagInput)).rejects.toThrow(new Error());
    });

    it("should return an TagModel instance when operations succeed", async () => {
      expect(sut.execute(tagInput)).resolves.toEqual(makeFakeTag());
    });
  });
});
