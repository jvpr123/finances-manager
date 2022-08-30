export interface IDeleteUnitUseCase {
  execute(id: string): Promise<boolean>;
}
