export interface IDeleteTransactionRepository {
  delete(id: string): Promise<boolean>;
}
