import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";
import { FavoriteBook } from "./favorite_book.model";
import { Comment } from "./comment.model";
import { UserRole } from "./user_role.model";
import { Rent } from "./rent.model";
import * as bcrypt from "bcryptjs";
@Table({
  modelName: "user",
  tableName: "user",
})
export class User extends Model {
  @Column
  name: string;

  @Column
  surname: string;

  @Column
  address: string | null;

  @Column
  address_number: string | null;

  @Column
  address_complement: string | null;

  @Column
  address_district: string | null;

  @Column
  address_city: string | null;

  @Column
  address_zipcode: string | null;

  @Column
  email: string;
  
  @Column
  password: string;

  @Column
  salt: string;

  @Column
  email_confirmed: boolean;

  @CreatedAt
  create_date: Date | null;

  @UpdatedAt
  updated_date: Date | null;

  @DeletedAt
  deleted_date: Date | null;

  @HasMany(() => FavoriteBook)
  favorite_books: Array<FavoriteBook>;

  @HasMany(() => Comment)
  comments: Array<Comment>;

  @HasMany(() => UserRole)
  user_roles: Array<UserRole>;

  @HasMany(() => Rent)
  rent: Array<Rent>;

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
export default User;
