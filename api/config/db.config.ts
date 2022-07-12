import { Sequelize } from "sequelize-typescript";
import { Comment } from "../model/comment.model";
import { Book } from "../model/book.model";
import { FavoriteBook } from "../model/favorite_book.model";
import { Permission } from "../model/permission.model";
import { Rent } from "../model/rent.model";
import { Role } from "../model/role.model";
import { RolePermission } from "../model/role_permission.model";
import { User } from "../model/user.model";
import { UserRole } from "../model/user_role.model";

export const connect = () => {
  const hostName = process.env.DB_HOST;
  const userName = process.env.DB_USER;
  const password = process.env.DB_PWD;
  const database = process.env.DB_NAME;
  const port: any = process.env.DB_PORT;
  const dialect: any = process.env.DB_DIALECT;

  console.log("dialect  ", dialect);

  const operatorsAliases: any = false;

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    dialect,
    operatorsAliases,
    port,
    models: ["../model"],
    repositoryMode: true,
    logging: true,
    schema: "public",
    omitNull: true,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
  });
  sequelize.addModels([process.cwd() + "/**/*.model.ts"]);

  const db: DBConfig = {
    sequelize: sequelize,
  };

  return db;
};
export class DBConfig {
  sequelize: Sequelize;
}
