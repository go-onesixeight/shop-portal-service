import { RoleAccount } from "src/common/types";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("member")
export class Member {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "varchar", nullable: false })
  username: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", nullable: false })
  confirmPassword: string;

  @Column({ type: "varchar", nullable: true })
  image?: string;

  @Column({
    name: "role",
    type: "enum",
    enum: RoleAccount,
    default: RoleAccount.Member,
  })
  role?: RoleAccount;

  @CreateDateColumn() created?: Date;

  @CreateDateColumn() updated?: Date;
}
