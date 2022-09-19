import { Repository } from "typeorm";

import { ICreateUnitRepository } from "src/data/protocols/database/units/CreateUnitRepository.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";
import { IUpdateUnitRepository } from "src/data/protocols/database/units/UpdateUnitRepository.interface";
import { IDeleteUnitRepository } from "src/data/protocols/database/units/DeleteUnitRepository.interface";

import { ICreateUnitDto } from "src/domain/dto/units/ICreateUnit.dto";
import { IUpdateUnitInput } from "src/domain/dto/units/IUpdateUnit.dto";
import { IUnitModel } from "src/domain/models/Unit.model";

import { Unit } from "./Unit.entity";
import { User } from "../users/User.entity";

export class UnitTypeOrmRepository
  implements
    ICreateUnitRepository,
    IFindUnitsRepository,
    IUpdateUnitRepository,
    IDeleteUnitRepository
{
  constructor(private repository: Repository<Unit>) {}

  async create({ owner, ...data }: ICreateUnitDto): Promise<IUnitModel> {
    const unitToCreate = this.repository.create(data);
    unitToCreate.owner = owner as User;

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

  async update({ id, ...data }: IUpdateUnitInput): Promise<IUnitModel> {
    await this.repository.update({ id }, data);
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result.affected ? true : false;
  }
}
