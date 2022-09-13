import { makeFakeCategory } from "src/__tests__/utils/CategoryMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindAllCategoriesUseCase } from "src/domain/useCases/categories/read/FindAllCategories.interface";

import { IController } from "src/presentation/protocols/Controller.interface";
import { FindAllCategoriesController } from "./FindAllCategories.controller";
import {
  internalServerError,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";

import * as errorHandler from "src/errors/utils/Handler.error";

const makeUseCaseStub = (): IFindAllCategoriesUseCase => ({
  execute: jest.fn().mockResolvedValue([makeFakeCategory()]),
});

const makeSUT = (useCase: IFindAllCategoriesUseCase): IController =>
  new FindAllCategoriesController(useCase);

describe("Find All Users Controller", () => {
  let sut: IController;
  let useCase: IFindAllCategoriesUseCase;

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: FindAllCategoriesUseCase", () => {
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
      expect(sut.handle({})).resolves.toEqual(
        ok({ categories: [makeFakeCategory()] })
      );
    });
  });
});
