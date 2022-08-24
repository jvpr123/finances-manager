import Joi from "joi";

import { FindUserByEmailValidator } from "./FindUserByEmail.validator";
import { options } from "src/infra/validation/joi/config/Joi.options";

describe("FindUserByEmail Validator", () => {
  const sut = new FindUserByEmailValidator();
  const validateSpy = jest.spyOn(Joi, "assert");
  const userEmail = "user@email.com";

  it("should call assert() method with correct values", () => {
    sut.validate(userEmail);

    expect(validateSpy).toHaveBeenCalledWith(
      userEmail,
      Joi.string().email().message(`"email" must be a valid email`),
      options
    );
  });

  it("should return a validation result with user data when validation succeeds", () => {
    expect(sut.validate(userEmail)).toEqual({
      isValid: true,
      data: userEmail,
    });
  });

  it("should return a validation result with errors when validation fails", async () => {
    expect(sut.validate("invalid_email")).toEqual({
      isValid: false,
      data: ['"email" must be a valid email'],
    });
  });
});
