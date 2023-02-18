import { RoleUser, Statused } from "src/common/types";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "member" })
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
    enum: RoleUser,
    default: RoleUser.MEMBER,
  })
  role?: RoleUser;

  @Column({
    name: "status",
    type: "enum",
    enum: Statused,
    default: Statused.CREATED,
  })
  status?: Statused;

  @Column({ nullable: true })
  emailReferenceNo?: string;

  @Column({ nullable: true })
  otp?: string;

  @Column({ nullable: true })
  otpReferenceNo?: string;

  @CreateDateColumn({ type: "timestamp" }) created?: Date;

  @CreateDateColumn({ type: "timestamp" }) updated?: Date;
}
