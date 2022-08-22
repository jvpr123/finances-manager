export interface IValidator<T> {
  validate(input: any): T | Error[];
}
