export interface IValidationResult {
  isValid: boolean;
  data: any;
}
export interface IValidator {
  validate(input: any): IValidationResult;
}
