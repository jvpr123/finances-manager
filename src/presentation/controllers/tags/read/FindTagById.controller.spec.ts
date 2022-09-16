import { makeFakeTag } from "src/__tests__/utils/TagMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindTagByIdUseCase } from "src/domain/useCases/tags/read/FindTagById.interface";

import {
  internalServerError,
  notFound,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";
import { IController } from "src/presentation/protocols/Controller.interface";
import { FindTagByIdController } from "./FindTagById.controller";

import * as errorHandler from "src/errors/utils/Handler.error";
import { NotFoundError } from "src/errors/NotFound.error";

const makeUseCaseStub = (): IFindTagByIdUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeTag()),
});

const makeSUT = (useCase: IFindTagByIdUseCase): IController =>
  new FindTagByIdController(useCase);

describe("FindTagByTitle Controller", () => {
  let sut: IController;
  let useCase: IFindTagByIdUseCase;

  const httpRequest = { params: { id: "tag_id" } };

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: FindTagByIdUseCase", () => {
    it("should call execute() method from findTagByIdUseCase with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith(httpRequest.params.id);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      useCase.execute = rejectValueOnce(new Error("error"));

      await sut.handle(httpRequest);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return a 404 status-code response when use-case throws a Not Found Error", async () => {
      useCase.execute = rejectValueOnce(new NotFoundError("Not found"));
      expect(sut.handle(httpRequest)).resolves.toEqual(notFound("Not found"));
    });

    it("should return a 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle(httpRequest)).resolves.toEqual(
        internalServerError("error")
      );
    });

    it("should return a 200 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(httpRequest)).resolves.toEqual(
        ok({ tag: makeFakeTag() })
      );
    });
  });
});
