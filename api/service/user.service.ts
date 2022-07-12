import { User } from "../model/user.model";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async get(id: number) {
    return await this.userRepository.get(id);
  }

  async getByEmail(email: string) {
    return await this.userRepository.getByEmail(email);
  }
  async getAll() {
    return await this.userRepository.getAll();
  }

  async create(user: User) {
    return await this.userRepository.create(user);
  }

  async update(user: User) {
    return await this.userRepository.update(user);
  }

  async delete(userId: number) {
    return await this.userRepository.delete(userId);
  }
}
