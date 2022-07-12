import { APILogger } from "../logger/api.logger";
import { RoleService } from "../service/role.service";
import { UserService } from "../service/user.service";

export class ConfigController {
  private userService: UserService;
  private logger: APILogger;
  private roleService: RoleService;
  constructor() {
    this.userService = new UserService();
    this.roleService = new RoleService();
    this.logger = new APILogger();
  }

  createAdmin(){
    
  }
}
export default ConfigController;
