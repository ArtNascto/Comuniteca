import {
  Table,
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Permission } from "./permission.model";
import { Role } from "./role.model";
@Table({
  modelName: "role_permission",
  tableName: "role_permission",
})
export class RolePermission extends Model {
  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @ForeignKey(() => Permission)
  @Column
  permission_id: number;

  @CreatedAt
  create_date: Date;

  @DeletedAt
  deleted_date: Date | null;

  @BelongsTo(() => Role)
  role: Role;

  @BelongsTo(() => Permission)
  permission: Permission;

}
export default RolePermission;
