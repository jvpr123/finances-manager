import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IUserModel } from "src/domain/models/User.model";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";

@Entity()
export class User implements IUserModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", width: 255 })
  name: string;

  @Column({ type: "varchar", width: 100, unique: true })
  email: string;

  @Column({ type: "varchar", width: 100, select: false })
  password: string;

  @Column({ type: "varchar", width: 50 })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Unit, (unit) => unit.owner, { eager: true, cascade: true })
  units?: Unit[];
}
