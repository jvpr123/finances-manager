import { makeFakeUser } from "src/__tests__/utils/UserMocks.factory";
import { makeFakeCreateUserRequest } from "src/__tests__/utils/http/users/HttpUsersMocks.factory";
import { rejectValueOnce } from "src/__tests__/utils/jest/MockReturnValues.factory";

import { ICreateUserUseCase } from "src/domain/useCases/users/create/CreateUser.interface";
import { IController } from "src/presentation/protocols/Controller.interface";
import { CreateUserController } from "./CreateUser.controller";
import {
  created,
  badRequest,
  internalServerError,
} from "src/presentation/utils/http/HttpResponse.factory";

import * as errorHandler from "src/errors/utils/Handler.error";
import { ValidationError } from "src/errors/Validation.error";

const makeUseCaseStub = (): ICreateUserUseCase => ({
  execute: jest.fn().mockResolvedValue(makeFakeUser()),
});

const makeSUT = (useCase: ICreateUserUseCase): IController =>
  new CreateUserController(useCase);

describe("Create User Controller", () => {
  let sut: IController;
  let useCase: ICreateUserUseCase;

  const httpRequest = makeFakeCreateUserRequest();

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

    it("should return a 400 status-code response when use-case throws a Validation Error", async () => {
      useCase.execute = rejectValueOnce(new ValidationError([]));
      expect(sut.handle(makeFakeCreateUserRequest())).resolves.toEqual(
        badRequest([])
      );
    });

    it("should return a 500 status-code response when use-case throws general errors", async () => {
      useCase.execute = rejectValueOnce(new Error("error"));

      expect(sut.handle(makeFakeCreateUserRequest())).resolves.toEqual(
        internalServerError("error")
      );
    });

    it("should return a 201 status-code response when useCase operation succeeds", async () => {
      expect(sut.handle(makeFakeCreateUserRequest())).resolves.toEqual(
        created({ user: makeFakeUser() })
      );
    });
  });
});
