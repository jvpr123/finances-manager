import { Repository } from "typeorm";

import { ICreateUnitRepository } from "src/data/protocols/database/units/CreateUnitRepository.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";

import { ICreateUnitInput } from "src/domain/dto/units/ICreateUnit.dto";
import { IUnitModel } from "src/domain/models/Unit.model";

import { Unit } from "./Unit.entity";

export class UnitTypeOrmRepository
  implements ICreateUnitRepository, IFindUnitsRepository
{
  constructor(private repository: Repository<Unit>) {}

  async create(data: ICreateUnitInput): Promise<IUnitModel> {
    const unitToCreate = this.repository.create(data);
    return await this.repository.save(unitToCreate);
  }

  async findAll(): Promise<IUnitModel[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<IUnitModel> {
    return await this.repository.findOneBy({ name });
  }

  async findById(id: string): Promise<IUnitModel> {
    return await this.repository.findOneBy({ id });
  }
}
