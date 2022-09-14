import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IUnitModel } from "src/domain/models/Unit.model";

import { User } from "src/infra/database/typeORM/users/User.entity";
import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";

@Entity()
export class Unit implements IUnitModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", width: 255, unique: true })
  name: string;

  @Column({ type: "varchar", width: 100 })
  description: string;

  @Column({ type: "decimal" })
  initialBalance: number;

  @Column({ type: "decimal" })
  currentBalance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.units)
  owner: User;

  @OneToMany(() => Transaction, (transaction) => transaction.unit, {
    eager: true,
  })
  transactions: Transaction[];
}
