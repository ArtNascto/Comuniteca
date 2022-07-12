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
  modelName: "favorite_book",
  tableName: "favorite_book",
})
export class FavoriteBook extends Model {
  @ForeignKey(() => Book)
  @Column
  book_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @CreatedAt
  create_date: Date;

  @DeletedAt
  deleted_date: Date | null;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;
}
export default FavoriteBook;
