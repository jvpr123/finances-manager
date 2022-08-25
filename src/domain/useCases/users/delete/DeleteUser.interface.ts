export interface IDeleteUserUseCase {
  execute(id: string): Promise<Partial<boolean>>;
}
