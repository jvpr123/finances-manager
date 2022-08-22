export interface IValidator<Input, Output> {
  validate(input: Input): Promise<Output>;
}
