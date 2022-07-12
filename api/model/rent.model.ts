import {
  Table,
  Column,
  Model,
  CreatedAt,
  ForeignKey,
  DeletedAt,
  BelongsTo,
} from "sequelize-typescript";
import { Book } from "./book.model";
import { User } from "./user.model";
@Table({
  modelName: "rent",
  tableName: "rent",
})
export class Rent extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Book)
  @Column
  book_id: number;

  @Column
  penalty: number | null;

  @Column
  rent_date: Date;

  @Column
  devolution_date: Date | null;

  @CreatedAt
  create_date: Date;

  @DeletedAt
  deleted_date: Date | null;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;
}
export default Rent;
