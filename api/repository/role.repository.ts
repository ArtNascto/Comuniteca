import { connect, DBConfig } from "../config/db.config";
import { APILogger } from "../logger/api.logger";
import Role from "../model/role.model";
import User from "../model/user.model";
import UserRole from "../model/user_role.model";

export class RoleRepository {
  private logger: APILogger;
  private db: DBConfig = {
    sequelize: null,
  };
  private userRepository: any;
  private userRoleRepository: any;
  private roleRepository: any;

  constructor() {
    this.db = connect();
    this.logger = new APILogger();
    this.userRepository = this.db.sequelize.getRepository(User);
    this.userRoleRepository = this.db.sequelize.getRepository(UserRole);
    this.roleRepository = this.db.sequelize.getRepository(Role);
  }

  async get(roleId: number): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({ where: { id: roleId } });
      return role;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getAll(): Promise<Array<Role>> {
    try {
      const roles = await this.roleRepository.findAll({});
      return roles;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async create(role: Role): Promise<Role> {
    try {
      role.create_date = new Date();
      const verify = await this.roleRepository.findOne({
        where: { name: role.name },
      });
      if (verify == null || verify.id == null || verify.id == undefined) {
        role = await this.roleRepository.create(role, {});
        return role;
      } else {
        throw new Error("user already exists");
      }
    } catch (err) {
      this.logger.error("Error::" + err);
      throw err;
    }
  }

  async update(role: Role): Promise<Role> {
    try {
      role.updated_date = new Date();
      await this.roleRepository.update(
        { ...role },
        {
          where: {
            id: role.id,
          },
        }
      );
      return role;
    } catch (err) {
      this.logger.error("Error::" + err);
      throw err;
    }
  }
  async delete(roleId: number): Promise<number> {
    let data = 0;
    try {
      data = await this.roleRepository.destroy({
        where: {
          id: roleId,
        },
      });
    } catch (err) {
      this.logger.error("Error::" + err);
      throw err;
    }
    return data;
  }
}
