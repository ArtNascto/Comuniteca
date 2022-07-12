import {
  Table,
  Column,
  Model,
  CreatedAt,
  ForeignKey,
  DeletedAt,
  BelongsTo,
} from "sequelize-typescript";
import { Role } from "./role.model";
import { User } from "./user.model";
@Table({
  modelName: "user_role",
  tableName: "user_role",
})
export class UserRole extends Model {
  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @CreatedAt
  create_date: Date;

  @DeletedAt
  deleted_date: Date | null;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Role)
  role: Role;
}
export default UserRole;
