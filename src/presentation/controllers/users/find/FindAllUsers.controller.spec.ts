import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import { makeFakeRequest } from "src/__tests__/utils/http/HttpMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindAllUsersUseCase } from "src/domain/useCases/users/read/FindAllUsers.interface";

import { IController } from "src/presentation/protocols/Controller.interface";
import { IHttpRequest } from "src/presentation/protocols/Http.interface";
import { FindAllUsersController } from "./FindAllUsers.controller";
import {
  internalServerError,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";

import * as errorHandler from "src/errors/utils/Handler.error";

const makeUseCaseStub = (): IFindAllUsersUseCase => ({
  execute: jest.fn().mockResolvedValue([makeFakeUser()]),
});

const makeSUT = (useCase: IFindAllUsersUseCase): IController =>
  new FindAllUsersController(useCase);

describe("Find All Users Controller", () => {
  let sut: IController;
  let useCase: IFindAllUsersUseCase;

  const httpRequest: IHttpRequest = makeFakeRequest();

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: FindAllUsersUseCase", () => {
    it("should call execute() method from use-case with correct values", async () => {
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

    it("should return an 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle(makeFakeRequest())).resolves.toEqual(
        internalServerError("error")
      );
    });

    it("should return a 200 status-code response when use-case operation succeeds", async () => {
      expect(sut.handle(httpRequest)).resolves.toEqual(
        ok({ users: [makeFakeUser()] })
      );
    });
  });
});
