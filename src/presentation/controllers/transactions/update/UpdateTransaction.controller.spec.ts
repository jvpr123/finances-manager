import { makeFakeTransaction } from "src/__tests__/utils/TransactionMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";
import { makeFakeUpdateTransactionRequest } from "src/__tests__/utils/http/transactions/HttpTransactionsMocks.factory";

import { IUpdateTransactionUseCase } from "src/domain/useCases/transactions/update/UpdateTransaction.interface";

import {
  ok,
  badRequest,
  internalServerError,
} from "src/presentation/utils/http/HttpResponse.factory";
import { IController } from "src/presentation/protocols/Controller.interface";
import { UpdateTransactionController } from "./UpdateTransaction.controller";

import * as errorHandler from "src/errors/utils/Handler.error";
import { ValidationError } from "src/errors/Validation.error";

const makeUseCaseStub = (): IUpdateTransactionUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeTransaction(150)),
});

const makeSUT = (useCase: IUpdateTransactionUseCase): IController =>
  new UpdateTransactionController(useCase);

describe("Update Transaction Controller", () => {
  let sut: IController;
  let useCase: IUpdateTransactionUseCase;

  const httpRequest = makeFakeUpdateTransactionRequest();

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: UpdateUnitUseCase", () => {
    it("should call execute() method with correct values", async () => {
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
        ok({ updated: true, transaction: makeFakeTransaction(150) })
      );
    });
  });
});
