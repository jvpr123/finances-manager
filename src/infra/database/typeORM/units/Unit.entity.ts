import { IUnitModel } from "src/domain/models/Unit.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
}
