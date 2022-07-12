import {
  Table,
  Column,
  Model,
  ForeignKey,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  BelongsTo,
} from "sequelize-typescript";
import { Book } from "./book.model";
import { User } from "./user.model";

@Table({
  modelName: "comment",
  tableName: "comment",
})
export class Comment extends Model {
  @ForeignKey(() => Book)
  @Column
  book_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  title: string;

  @Column
  comment: string;

  @Column
  stars: number;

  @CreatedAt
  create_date: Date;

  @DeletedAt
  deleted_date: Date | null;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;
}
export default Comment;
