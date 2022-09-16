export interface IDeleteTagUseCase {
  execute(id: string): Promise<boolean>;
}
