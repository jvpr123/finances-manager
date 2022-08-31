import { makeFakeTransaction } from "src/__tests__/utils/TransactionMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindAllTransactionsUseCase } from "src/domain/useCases/transactions/read/FindAllTransactions.interface";

import {
  internalServerError,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";
import { IController } from "src/presentation/protocols/Controller.interface";
import { FindAllTransactionsController } from "./FindAllTransactions.controller";

import * as errorHandler from "src/errors/utils/Handler.error";

const makeUseCaseStub = (): IFindAllTransactionsUseCase => ({
  execute: jest.fn().mockResolvedValue([makeFakeTransaction()]),
});

const makeSUT = (useCase: IFindAllTransactionsUseCase): IController =>
  new FindAllTransactionsController(useCase);

describe("Find All Transactions Controller", () => {
  let sut: IController;
  let useCase: IFindAllTransactionsUseCase;

  const httpRequest = {};

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: FindAllTransactionsUseCase", () => {
    it("should call execute() method with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith();
      expect(useCase.execute).toHaveBeenCalledTimes(1);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      useCase.execute = rejectValueOnce(new Error("error"));

      await sut.handle(httpRequest);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return a 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle(httpRequest)).resolves.toEqual(
        internalServerError("error")
      );
    });

    it("should return a 200 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(httpRequest)).resolves.toEqual(
        ok({ transactions: [makeFakeTransaction()] })
      );
    });
  });
});
