export interface IDeleteUnitRepository {
  delete(id: string): Promise<boolean>;
}
