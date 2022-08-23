import { makeFakeUser } from "@core/__tests__/utils/UserMocks.factory";
import { makeFakeRequest } from "@core/__tests__/utils/http/HttpMocks.factory";
import { rejectValueOnce } from "@core/__tests__/utils/jest/MockReturnValues.factory";

import { ICreateUserUseCase } from "@core/domain/useCases/users/create/CreateUser.interface";
import { IController } from "@core/presentation/protocols/Controller.interface";
import { CreateUserController } from "./CreateUser.controller";
import {
  created,
  badRequest,
  internalServerError,
} from "@core/presentation/utils/http/HttpResponse.factory";

import * as errorHandler from "@core/errors/Handler.error";
import { ValidationError } from "@core/errors/validation/Validation.error";

const makeUseCaseStub = (): ICreateUserUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeUser()),
});

const makeSUT = (useCase: ICreateUserUseCase): IController =>
  new CreateUserController(useCase);

describe("Create User Controller", () => {
  let sut: IController;
  let useCase: ICreateUserUseCase;

  const httpRequest = makeFakeRequest();

  beforeEach(() => {
    useCase = makeUseCaseStub();
    sut = makeSUT(useCase);
  });

  describe("Dependency: CreateUserUseCase", () => {
    it("should call execute() method from createUserUseCase with correct values", async () => {
      await sut.handle(httpRequest);
      expect(useCase.execute).toHaveBeenCalledWith(httpRequest.body);
    });

    it("should call errorHandler() with correct values when use-case throws an error", async () => {
      const errorHandlerSpy = jest.spyOn(errorHandler, "errorHandler");
      useCase.execute = rejectValueOnce(new Error("error"));

      await sut.handle(httpRequest);
      expect(errorHandlerSpy).toHaveBeenCalledWith(new Error("error"));
    });

    it("should return an 400 status-code response when use-case throws a Validation Error", async () => {
      useCase.execute = rejectValueOnce(new ValidationError([]));
      expect(sut.handle(makeFakeRequest())).resolves.toEqual(badRequest([]));
    });

    it("should return an 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle(makeFakeRequest())).resolves.toEqual(
        internalServerError("error")
      );
    });

    it("should return a 201 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(makeFakeRequest())).resolves.toEqual(
        created({ user: makeFakeUser() })
      );
    });
  });
});