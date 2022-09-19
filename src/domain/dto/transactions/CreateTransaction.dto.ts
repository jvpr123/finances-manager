import { IUnitModel } from "src/domain/models/Unit.model";
import { ICategoryModel } from "src/domain/models/Category.model";
import { ITagModel } from "src/domain/models/Tag.model";

export interface ICreateTransactionInput {
  unitId: string;
  categoryId: string;
  tagsId?: string[];

  title: string;
  description?: string;
  value: number;
  transactionDate: Date;
}

export interface ICreateTransactionDto {
  unit: IUnitModel;
  category: ICategoryModel;
  tags?: ITagModel[];

  title: string;
  description?: string;
  value: number;
  transactionDate: Date;
}
