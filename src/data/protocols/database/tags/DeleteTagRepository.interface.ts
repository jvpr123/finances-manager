export interface IDeleteTagRepository {
  delete(id: string): Promise<boolean>;
}
