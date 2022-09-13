import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";
import { makeFakeUpdateCategoryRequest } from "src/__tests__/utils/http/categories/HttpCategoriesMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IUpdateCategoryUseCase } from "src/domain/useCases/categories/update/UpdateCategory.interface";

import {
  ok,
  badRequest,
  internalServerError,
} from "src/presentation/utils/http/HttpResponse.factory";
import { IController } from "src/presentation/protocols/Controller.interface";
import { UpdateCategoryController } from "./UpdateCategory.controller";

import * as errorHandler from "src/errors/utils/Handler.error";
import { ValidationError } from "src/errors/Validation.error";

const makeUseCaseStub = (): IUpdateCategoryUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeCategory()),
});

const makeSUT = (useCase: IUpdateCategoryUseCase): IController =>
  new UpdateCategoryController(useCase);

describe("Update Category Controller", () => {
  let sut: IController;
  let useCase: IUpdateCategoryUseCase;

  const httpRequest = makeFakeUpdateCategoryRequest();

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: UpdateCategoryUseCase", () => {
    it("should call execute() method from updateCategoryUseCase with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith(httpRequest.body);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      useCase.execute = rejectValueOnce(new Error("error"));

      await sut.handle(httpRequest);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return a 400 status-code response when use-case throws a Validation Error", async () => {
      useCase.execute = rejectValueOnce(new ValidationError([]));
      expect(sut.handle(httpRequest)).resolves.toEqual(badRequest([]));
    });

    it("should return a 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle(httpRequest)).resolves.toEqual(
        internalServerError("error")
      );
    });

    it("should return a 200 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(httpRequest)).resolves.toEqual(
        ok({ updated: true, category: makeFakeCategory() })
      );
    });
  });
});
