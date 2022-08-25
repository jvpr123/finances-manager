export interface IDeleteUserRepository {
  delete(id: string): Promise<boolean>;
}
