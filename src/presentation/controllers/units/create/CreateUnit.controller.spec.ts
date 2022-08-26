import { makeFakeUnit } from "src/__tests__/utils/UnitMocks.factory";
import { makeFakeCreateUnitRequest } from "src/__tests__/utils/http/units/HttpUnitsMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { ICreateUnitUseCase } from "src/domain/useCases/units/create/ICreateUnit.interface";

import {
  created,
  badRequest,
  internalServerError,
} from "src/presentation/utils/http/HttpResponse.factory";
import { IController } from "src/presentation/protocols/Controller.interface";
import { CreateUnitController } from "./CreateUnit.controller";

import * as errorHandler from "src/errors/utils/Handler.error";
import { ValidationError } from "src/errors/Validation.error";

const makeUseCaseStub = (): ICreateUnitUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeUnit()),
});

const makeSUT = (useCase: ICreateUnitUseCase): IController =>
  new CreateUnitController(useCase);

describe("Create Unit Controller", () => {
  let sut: IController;
  let useCase: ICreateUnitUseCase;

  const httpRequest = makeFakeCreateUnitRequest();

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: CreateUnitUseCase", () => {
    it("should call execute() method from createUnitUseCase with correct values", async () => {
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

    it("should return a 201 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(httpRequest)).resolves.toEqual(
        created({ unit: makeFakeUnit() })
      );
    });
  });
});
