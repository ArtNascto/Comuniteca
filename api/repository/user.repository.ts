import { connect, DBConfig } from "../config/db.config";
import { APILogger } from "../logger/api.logger";
import { User } from "../model/user.model";
import { UserRole } from "../model/user_role.model";
import { Password } from "../utils/security/password";
import Role from "../model/role.model";

export class UserRepository {
  private logger: APILogger;
  private db: DBConfig = {
    sequelize: null,
  };
  private userRepository: any;
  private userRoleRepository: any;
  private roleRepository: any;
  private passwordUtil: Password;
  constructor() {
    this.db = connect();
    this.logger = new APILogger();
    this.userRepository = this.db.sequelize.getRepository(User);
    this.userRoleRepository = this.db.sequelize.getRepository(UserRole);
    this.roleRepository = this.db.sequelize.getRepository(Role);
    this.passwordUtil = new Password();
  }

  async get(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (user != null) {
        user.password = "***";
        user.salt = "***";
      }
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async getByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if (user != null) {
        return user;
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async getAll(): Promise<Array<User>> {
    try {
      const users = await this.userRepository.findAll({});
      if (users != null && users.length > 0) {
        users.forEach((user) => {
          user.password = "***";
          user.salt = "***";
        });
      }
      return users;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async create(user: User): Promise<User> {
    try {
      user.create_date = new Date();
      const verify = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (verify == null || verify.id == null || verify.id == undefined) {
        [user.password, user.salt] = this.passwordUtil.generateHash(
          user.password
        );
        user = await this.userRepository.create(user, {});
        user.password = "****";
        user.salt = "****";
        return user;
      } else {
        throw new Error("user already exists");
      }
    } catch (err) {
      this.logger.error("Error::" + err);
      throw err;
    }
  }

  async update(user: User): Promise<User> {
    try {
      user.updated_date = new Date();
      await this.userRepository.update(
        { ...user },
        {
          where: {
            id: user.id,
          },
        }
      );
      user.password = "****";
      user.salt = "****";
      return user;
    } catch (err) {
      this.logger.error("Error::" + err);
      throw err;
    }
  }

  async delete(userId: number): Promise<number> {
    let data = 0;
    try {
      data = await this.userRepository.destroy({
        where: {
          id: userId,
        },
      });
    } catch (err) {
      this.logger.error("Error::" + err);
      throw err;
    }
    return data;
  }
  async getUserRole(userId: number): Promise<Role> {
    try {
      const userRole = await this.userRoleRepository.findOne({
        where: { user_id: userId },
      });

      if (userRole != null && userRole.length > 0) {
        const role = await this.roleRepository.findOne({
          where: { id: userRole.role_id },
        });
        if (role != null) role.push(role);
        return role;
      }
    } catch (err) {
      this.logger.error("Error::" + err);
      throw err;
    }
  }
}
