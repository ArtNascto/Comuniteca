import Role from "../model/role.model";
import { RoleRepository } from "../repository/role.repository";

export class RoleService {
  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  async get(roleId: number): Promise<Role> {
    return await this.roleRepository.get(roleId);
  }
  async getAll(): Promise<Array<Role>> {
    return this.roleRepository.getAll();
  }
  async create(role: Role): Promise<Role> {
    return this.roleRepository.create(role);
  }

  async update(role: Role): Promise<Role> {
    return this.roleRepository.update(role);
  }

  async delete(roleId: number) {
    return this.roleRepository.delete(roleId);
  }
}
