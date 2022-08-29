import { makeFakeUnit } from "src/__tests__/utils/UnitMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindAllUnitsUseCase } from "src/domain/useCases/units/read/IFindAllUnits.interface";

import {
  internalServerError,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";
import { IController } from "src/presentation/protocols/Controller.interface";
import { FindAllUnitsController } from "./FindAllUnits.controller";

import * as errorHandler from "src/errors/utils/Handler.error";

const makeUseCaseStub = (): IFindAllUnitsUseCase => ({
  execute: jest.fn().mockResolvedValue([makeFakeUnit()]),
});

const makeSUT = (useCase: IFindAllUnitsUseCase): IController =>
  new FindAllUnitsController(useCase);

describe("Create Unit Controller", () => {
  let sut: IController;
  let useCase: IFindAllUnitsUseCase;

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: FindAllUnitsUseCase", () => {
    it("should call execute() method from findAllUnitsUseCase with correct values", async () => {
      await sut.handle({});
      expect(useCase.execute).toHaveBeenCalledWith();
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
      expect(sut.handle({})).resolves.toEqual(ok({ units: [makeFakeUnit()] }));
    });
  });
});
