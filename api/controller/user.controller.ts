import { APILogger } from "../logger/api.logger";
import User from "../model/user.model";
import { UserService } from "../service/user.service";

export class UserController {
  private userService: UserService;
  private logger: APILogger;

  constructor() {
    this.userService = new UserService();
    this.logger = new APILogger();
  }
  async getAll() {
    this.logger.info("Controller: getUsers", null);
    return await this.userService.getAll();
  }

  async create(user: User) {
    this.logger.info("Controller: createUser", user);
    return await this.userService.create(user);
  }

  async update(user: User) {
    this.logger.info("Controller: updateUser", user);
    return await this.userService.update(user);
  }

  async delete(userId: number) {
    this.logger.info("Controller: deleteUser", userId);
    return await this.userService.delete(userId);
  }
}
