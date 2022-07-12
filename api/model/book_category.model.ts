import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Book } from "./book.model";
import { Category } from "./category.model";

@Table({
  modelName: "book_category",
  tableName: "book_category",
})
export class BookCategory extends Model {
  @ForeignKey(() => Book)
  @Column
  book_id: number;

  @ForeignKey(() => Category)
  @Column
  category_id: number;

  @CreatedAt
  create_date: Date;

  @DeletedAt
  deleted_date: Date | null;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Book)
  book: Book;
}
export default BookCategory;
