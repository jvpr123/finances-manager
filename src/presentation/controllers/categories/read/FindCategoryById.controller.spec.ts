import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindCategoryByTitleUseCase } from "src/domain/useCases/categories/read/FindCategoryByTitle.interface";

import {
  internalServerError,
  notFound,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";
import { IController } from "src/presentation/protocols/Controller.interface";
import { IFindCategoryByIdUseCase } from "src/domain/useCases/categories/read/FindCategoryById.interface";

import * as errorHandler from "src/errors/utils/Handler.error";
import { NotFoundError } from "src/errors/NotFound.error";

import { FindCategoryByIdController } from "./FindCategoryById.controller";

const makeUseCaseStub = (): IFindCategoryByTitleUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeCategory()),
});

const makeSUT = (useCase: IFindCategoryByIdUseCase): IController =>
  new FindCategoryByIdController(useCase);

describe("FindCategoryById Controller", () => {
  let sut: IController;
  let useCase: IFindCategoryByIdUseCase;

  const httpRequest = { params: { id: "category_id" } };

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: FindCategoryByIdUseCase", () => {
    it("should call execute() method from findCategoryByIdUseCase with correct values", async () => {
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
        ok({ category: makeFakeCategory() })
      );
    });
  });
});
