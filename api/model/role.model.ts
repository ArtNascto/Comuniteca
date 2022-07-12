import {
  Table,
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { RolePermission } from "./role_permission.model";
import { UserRole } from "./user_role.model";
@Table({
  modelName: "role",
  tableName: "role",
})
export class Role extends Model {
  @Column
  name: string;

  @Column
  display_name: string;

  @CreatedAt
  create_date: Date;

  @UpdatedAt
  updated_date: Date;

  @DeletedAt
  deleted_date: Date | null;

  @HasMany(() => UserRole)
  user_role: UserRole;

  @HasMany(() => RolePermission)
  role_permission: RolePermission;
}
export default Role;
