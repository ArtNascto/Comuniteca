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
import { Rent } from "./rent.model";
@Table({
  modelName: "book",
  tableName: "book",
})
export class Book extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  author: string;

  @Column
  publishing_company: string;

  @Column
  publish_year: number;

  @Column
  isbn: string;

  @Column
  pages: number;

  @Column
  rent_max_days: number;

  @Column
  is_available: boolean;

  @CreatedAt
  create_date: Date;

  @UpdatedAt
  updated_date: Date;

  @DeletedAt
  deleted_date: Date | null;

  @HasMany(() => FavoriteBook)
  favorites: Array<FavoriteBook>;

  @HasMany(() => Comment)
  comments: Array<Comment>;

  @HasMany(() => Rent)
  rent: Array<Rent>;
}
export default Book;
