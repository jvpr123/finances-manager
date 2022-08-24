export class ValidationError extends Error {
  name: string;
  message: string;
  stack?: string;
  errors: Array<string>;

  constructor(errors: Array<string>, message?: string) {
    super(message ? message : "Validation failed with following constraints");
    this.name = "VALIDATION_ERROR";
    this.errors = errors;
  }
}
