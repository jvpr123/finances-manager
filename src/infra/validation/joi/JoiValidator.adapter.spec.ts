import { makeFakeCreateUserInput } from "src/__tests__/utils/UserMocks.factory";

import { options } from "src/infra/validation/joi/config/Joi.options";
import { CreateUserJoiSchema } from "src/infra/validation/joi/schemas/users/CreateUser.schema";
import { JoiValidatorAdapter } from "./JoiValidator.adapter";

describe("Joi Validator Adapter", () => {
  const sut = new JoiValidatorAdapter(CreateUserJoiSchema);
  const validateSpy = jest.spyOn(CreateUserJoiSchema, "validate");
  const fakeUserInputData = makeFakeCreateUserInput();

  it("should call validate() method with correct values", () => {
    sut.validate(fakeUserInputData);
    expect(validateSpy).toHaveBeenCalledWith(fakeUserInputData, options);
  });

  it("should return a validation result with user data when validation succeeds", () => {
    expect(sut.validate(fakeUserInputData)).toEqual({
      isValid: true,
      data: makeFakeCreateUserInput(),
    });
  });

  it("should return a validation result with errors when validation fails", async () => {
    expect(
      sut.validate({ ...fakeUserInputData, email: "invalid_email" })
    ).toEqual({ isValid: false, data: ['"email" must be a valid email'] });
  });
});
