import { makeFakeUserInput } from "src/__tests__/utils/UserMocks.factory";

import { CreateUserValidator } from "./CreateUser.validator";
import { options } from "src/infra/validation/joi/config/Joi.options";
import { CreateUserJoiSchema } from "src/infra/validation/joi/schemas/CreateUser.schema";

describe("CreateUser Validator", () => {
  const sut = new CreateUserValidator(CreateUserJoiSchema);
  const validateSpy = jest.spyOn(CreateUserJoiSchema, "validate");
  const fakeUserInputData = makeFakeUserInput();

  it("should call validate() method with correct values", () => {
    sut.validate(fakeUserInputData);
    expect(validateSpy).toHaveBeenCalledWith(fakeUserInputData, options);
  });

  it("should return a validation result with user data when validation succeeds", () => {
    expect(sut.validate(fakeUserInputData)).toEqual({
      isValid: true,
      data: makeFakeUserInput(),
    });
  });

  it("should throw a validation result with errors when validation fails", async () => {
    expect(
      sut.validate({ ...fakeUserInputData, email: "invalid_email" })
    ).toEqual({ isValid: false, data: ['"email" must be a valid email'] });
  });
});
