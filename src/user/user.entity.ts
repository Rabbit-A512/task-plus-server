import { Todo } from './../todo/todo.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string; // 因为是bigint，取出来JSON表示为string

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 50, unique: true })
  nickname: string;

  @Column({ length: 100, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  passwordHash: string;

  @OneToMany(type => Todo, todo => todo.user)
  todos: Todo[];

  /**
   * 控制用户是否被删除（删除用户只改变此标志位，而不直接从DB中删除记录）
   *
   * @type {boolean}
   * @memberof User
   */
  @Column({ default: false })
  isDeleted: boolean;
}
