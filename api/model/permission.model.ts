import {
  Table,
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { RolePermission } from "./role_permission.model";
@Table({
  modelName: "permission",
  tableName: "permission",
})
export class Permission extends Model {
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

  @HasMany(() => RolePermission)
  role_permission: RolePermission;
}
export default Permission;
