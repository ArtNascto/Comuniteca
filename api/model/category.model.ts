import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
} from "sequelize-typescript";
import { BookCategory } from "./book_category.model";

@Table({
  modelName: "category",
  tableName: "category",
})
export class Category extends Model {
  @Column
  name: string;

  @Column
  display_name: string;

  @CreatedAt
  create_date: Date;

  @UpdatedAt
  updated_date: Date;

  @DeletedAt
  deleted_date: Date | null;

  @HasMany(() => BookCategory)
  book_category: Array<BookCategory>;
}
export default Category;
