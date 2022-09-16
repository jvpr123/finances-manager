import { makeFakeTag } from "src/__tests__/utils/TagMocks.factory";
import {
  rejectValueOnce,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindAllTagsUseCase } from "src/domain/useCases/tags/read/FindAllTags.interface";

import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
import { FindAllTagsUseCase } from "./FindAllTags.usecase";
import { makeFindTagsRepositoryStub } from "src/__tests__/utils/typeORM/tags/FindTagsRepository.factory";

describe("FindAllTags UseCase", () => {
  const makeSUT = (repository: IFindTagsRepository): IFindAllTagsUseCase =>
    new FindAllTagsUseCase(repository);

  let sut: IFindAllTagsUseCase;
  let repository: IFindTagsRepository;

  beforeEach(() => {
    repository = makeFindTagsRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Tags Repository", () => {
    it("should call findAll() method from tags repository with correct values", async () => {
      await sut.execute();
      expect(repository.findAll).toHaveBeenCalledWith();
    });

    it("should throw an error when repository throws", async () => {
      repository.findAll = rejectValueOnce(new Error());
      expect(sut.execute()).rejects.toThrow(new Error());
    });

    it("should return an empty array when no tag is registered", async () => {
      repository.findAll = resolveValueOnce([]);
      expect(sut.execute()).resolves.toEqual([]);
    });

    it("should return an array of TagModel instances when operations succeed", async () => {
      expect(sut.execute()).resolves.toEqual([makeFakeTag()]);
    });
  });
});
