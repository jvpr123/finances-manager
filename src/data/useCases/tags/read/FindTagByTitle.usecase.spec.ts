import { makeFakeTag } from "src/__tests__/utils/TagMocks.factory";
import { makeFindTagsRepositoryStub } from "src/__tests__/utils/typeORM/tags/FindTagsRepository.factory";
import {
  rejectValueOnce,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
import { FindTagByTitleUseCase } from "./FindTagByTitle.usecase";

import { IFindTagByTitleUseCase } from "src/domain/useCases/tags/read/FindTagByTitle.interface";

import { NotFoundError } from "src/errors/NotFound.error";

describe("FindTagByName UseCase", () => {
  const makeSUT = (repository: IFindTagsRepository): IFindTagByTitleUseCase =>
    new FindTagByTitleUseCase(repository);

  let sut: IFindTagByTitleUseCase;
  let repository: IFindTagsRepository;

  beforeEach(() => {
    repository = makeFindTagsRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Tags Repository", () => {
    it("should call findByTitle() method from tags repository with correct values", async () => {
      repository.findByTitle = resolveValueOnce(makeFakeTag());
      await sut.execute("tag_title");
      expect(repository.findByTitle).toHaveBeenCalledWith("tag_title");
    });

    it("should throw an error when repository throws", async () => {
      repository.findByTitle = rejectValueOnce(new Error());
      expect(sut.execute("tag_title")).rejects.toThrow(new Error());
    });

    it("should throw a Not Found error when repository returns undefined", async () => {
      repository.findByTitle = resolveValueOnce(undefined);
      expect(sut.execute("not_exist_tag")).rejects.toThrow(
        new NotFoundError(`Could not find data related to not_exist_tag tag`)
      );
    });

    it("should return a TagModel instance when operations succeed", async () => {
      repository.findByTitle = resolveValueOnce(makeFakeTag());
      expect(sut.execute("tag_title")).resolves.toEqual(makeFakeTag());
    });
  });
});
