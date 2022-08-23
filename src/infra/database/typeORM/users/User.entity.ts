import { IUserModel } from "src/domain/models/User.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
}
