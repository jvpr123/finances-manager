import { ICreateTagInput } from "src/domain/dto/tags/CreateTag.dto";
import { ITagModel } from "src/domain/models/Tag.model";

export interface ICreateTagUseCase {
  execute(input: ICreateTagInput): Promise<ITagModel>;
}
