export interface IDeleteTransactionUseCase {
  execute(id: string): Promise<boolean>;
}
