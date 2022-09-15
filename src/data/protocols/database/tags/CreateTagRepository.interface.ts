import { ICreateTagInput } from "src/domain/dto/tags/CreateTag.dto";
import { ITagModel } from "src/domain/models/Tag.model";

export interface ICreateTagRepository {
  create(data: ICreateTagInput): Promise<ITagModel>;
}
