import { makeFakeTag } from "src/__tests__/utils/TagMocks.factory";
import { makeFindTagsRepositoryStub } from "src/__tests__/utils/typeORM/tags/FindTagsRepository.factory";
import {
  rejectValueOnce,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { FindTagByIdUseCase } from "./FindTagById.usecase";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";

import { IFindTagByIdUseCase } from "src/domain/useCases/tags/read/FindTagById.interface";

import { NotFoundError } from "src/errors/NotFound.error";

describe("FindTagById UseCase", () => {
  const makeSUT = (repository: IFindTagsRepository): IFindTagByIdUseCase =>
    new FindTagByIdUseCase(repository);

  let sut: IFindTagByIdUseCase;
  let repository: IFindTagsRepository;

  beforeEach(() => {
    repository = makeFindTagsRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Tags Repository", () => {
    it("should call findById() method from tags repository with correct values", async () => {
      await sut.execute("tag_id");
      expect(repository.findById).toHaveBeenCalledWith("tag_id");
    });

    it("should throw an error when repository throws", async () => {
      repository.findById = rejectValueOnce(new Error());
      expect(sut.execute("tag_id")).rejects.toThrow(new Error());
    });

    it("should throw a Not Found error when repository returns undefined", async () => {
      repository.findById = resolveValueOnce(undefined);
      expect(sut.execute("not_exist_tag")).rejects.toThrow(
        new NotFoundError(`Could not find data related to tag ID provided`)
      );
    });

    it("should return an TagModel instance when operations succeed", async () => {
      expect(sut.execute("tag_id")).resolves.toEqual(makeFakeTag());
    });
  });
});
