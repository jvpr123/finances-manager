import { makeFakeTag } from "src/__tests__/utils/TagMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindAllTagsUseCase } from "src/domain/useCases/tags/read/FindAllTags.interface";

import { IController } from "src/presentation/protocols/Controller.interface";
import { FindAllTagsController } from "./FindAllTags.controller";
import {
  internalServerError,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";

import * as errorHandler from "src/errors/utils/Handler.error";

const makeUseCaseStub = (): IFindAllTagsUseCase => ({
  execute: jest.fn().mockResolvedValue([makeFakeTag()]),
});

const makeSUT = (useCase: IFindAllTagsUseCase): IController =>
  new FindAllTagsController(useCase);

describe("Find All Tags Controller", () => {
  let sut: IController;
  let useCase: IFindAllTagsUseCase;

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: FindAllTagsUseCase", () => {
    it("should call execute() method from use-case with correct values", async () => {
      await sut.handle({});
      expect(useCase.execute).toHaveBeenCalledWith();
      expect(useCase.execute).toHaveBeenCalledTimes(1);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      useCase.execute = rejectValueOnce(new Error("error"));

      await sut.handle({});
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return an 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle({})).resolves.toEqual(internalServerError("error"));
    });

    it("should return a 200 status-code response when use-case operation succeeds", async () => {
      expect(sut.handle({})).resolves.toEqual(ok({ tags: [makeFakeTag()] }));
    });
  });
});
