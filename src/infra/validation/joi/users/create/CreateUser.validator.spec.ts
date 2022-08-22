import {
  makeFakeUserDto,
  makeFakeUserInput,
} from "src/__tests__/utils/UserMocks.factory";

import { CreateUserValidator } from "./CreateUser.validator";
import { options } from "src/infra/validation/joi/Joi.options";
import CreateUserSchema from "src/infra/validation/joi/schemas/CreateUser.schema";

describe("CreateUser Validator", () => {
  const sut = new CreateUserValidator(CreateUserSchema);
  const validateSpy = jest.spyOn(CreateUserSchema, "validateAsync");
  const fakeUserInputData = makeFakeUserInput();

  it("should call validate() method with correct values", async () => {
    await sut.validate(fakeUserInputData);
    expect(validateSpy).toHaveBeenCalledWith(fakeUserInputData, options);
  });

  it("should throw an error when validation fails", async () => {
    expect(
      sut.validate({ ...fakeUserInputData, email: "invalid_email" })
    ).rejects.toThrow();
  });

  it("should return user data of type ICreateUserDto", async () => {
    expect(sut.validate(fakeUserInputData)).resolves.toEqual(makeFakeUserDto());
  });
});
