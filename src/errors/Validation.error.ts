export class ValidationError implements Error {
  name: string;
  message: string;
  stack?: string;
  errors: Array<string>;

  constructor(errors: Array<string>, message?: string) {
    this.name = "VALIDATION_ERROR";
    this.message = message
      ? message
      : "Validation failed with following constraints";
    this.errors = errors;
  }
}
