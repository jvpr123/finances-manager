import { Repository } from "typeorm";

import { ICreateUnitRepository } from "src/data/protocols/database/units/CreateUnitRepository.interface";

import { ICreateUnitInput } from "src/domain/dto/units/ICreateUnit.dto";
import { IUnitModel } from "src/domain/models/Unit.model";

import { Unit } from "./Unit.entity";

export class UnitTypeOrmRepository implements ICreateUnitRepository {
  constructor(private repository: Repository<Unit>) {}

  async create(data: ICreateUnitInput): Promise<IUnitModel> {
    const unitToCreate = this.repository.create(data);
    return await this.repository.save(unitToCreate);
  }
}
