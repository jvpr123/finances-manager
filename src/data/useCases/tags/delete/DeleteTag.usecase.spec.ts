import { makeFindTagsRepositoryStub } from "src/__tests__/utils/typeORM/tags/FindTagsRepository.factory";
import { makeFakeTag } from "src/__tests__/utils/TagMocks.factory";
import {
  rejectValueOnce,
  resolveValue,
  resolveValueOnce,
} from "src/__tests__/utils/jest/MockReturnValues.factory";

import { NotFoundError } from "src/errors/NotFound.error";

import { DeleteTagUseCase } from "./DeleteTag.usecase";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
import { IDeleteTagRepository } from "src/data/protocols/database/tags/DeleteTagRepository.interface";

import { IDeleteTagUseCase } from "src/domain/useCases/tags/delete/DeleteTag.interface";

type Repository = IFindTagsRepository & IDeleteTagRepository;
describe("Delete Tag UseCase", () => {
  const tagData = makeFakeTag();
  let sut: IDeleteTagUseCase;
  let repository: Repository;

  const makeRepositoryStub = (): Repository => ({
    ...makeFindTagsRepositoryStub(),
    delete: resolveValue(true),
  });

  const makeSUT = (repository: Repository) => new DeleteTagUseCase(repository);

  beforeEach(() => {
    repository = makeRepositoryStub();
    sut = makeSUT(repository);
  });

  describe("Dependency: Tags Repository", () => {
    it("should call findById() method with correct values", async () => {
      await sut.execute(tagData.id);
      expect(repository.findById).toHaveBeenCalledWith(tagData.id);
    });

    it("should throw an error when repository throws", async () => {
      repository.findById = rejectValueOnce(new Error());
      expect(sut.execute(tagData.id)).rejects.toThrow(new Error());
    });

    it("should throw a Not Found Error when repository returns undefined", async () => {
      repository.findById = resolveValueOnce(undefined);

      expect(sut.execute(tagData.id)).rejects.toEqual(
        new NotFoundError(
          `Could not delete: data related to ID provided not found`
        )
      );
    });

    it("should call delete() with correct values", async () => {
      await sut.execute(tagData.id);
      expect(repository.delete).toHaveBeenCalledWith(tagData.id);
    });

    it("should return true when deletion succeeds", async () => {
      expect(sut.execute(tagData.id)).resolves.toEqual(true);
    });
  });
});
