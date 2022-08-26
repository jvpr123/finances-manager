import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { IFindUserByEmailUseCase } from "src/domain/useCases/users/read/FindUserByEmail.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { IHttpRequest } from "src/presentation/protocols/Http.interface";
import { FindUserByEmailController } from "./FindUserByEmail.controller";
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from "src/presentation/utils/http/HttpResponse.factory";

import * as errorHandler from "src/errors/utils/Handler.error";
import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

const makeUseCaseStub = (): IFindUserByEmailUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeUser()),
});

const makeSUT = (useCase: IFindUserByEmailUseCase): IController =>
  new FindUserByEmailController(useCase);

describe("Find User By Email Controller", () => {
  let sut: IController;
  let useCase: IFindUserByEmailUseCase;

  const httpRequest: IHttpRequest = { params: { email: "user@email.com" } };

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: FindUserByEmailUseCase", () => {
    it("should call execute() method from findUserByEmailUseCase with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith(httpRequest.params.email);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      useCase.execute = rejectValueOnce(new Error("error"));

      await sut.handle(httpRequest);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return an 400 status-code response when use-case throws a Validation Error", async () => {
      useCase.execute = rejectValueOnce(new ValidationError([]));
      expect(sut.handle({})).resolves.toEqual(badRequest([]));
    });

    it("should return an 404 status-code response when use-case return undefined", async () => {
      const error = new NotFoundError(
        `Could not find data related to ${httpRequest.params.email} address`
      );

      useCase.execute = rejectValueOnce(error);
      expect(sut.handle({})).resolves.toEqual(
        notFound(
          `Could not find data related to ${httpRequest.params.email} address`
        )
      );
    });

    it("should return an 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle({})).resolves.toEqual(internalServerError("error"));
    });

    it("should return a 200 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(httpRequest)).resolves.toEqual(
        ok({ user: makeFakeUser() })
      );
    });
  });
});
