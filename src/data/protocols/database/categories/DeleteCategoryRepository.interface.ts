export interface IDeleteCategoryRepository {
  delete(id: string): Promise<boolean>;
}
