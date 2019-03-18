import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isFinished: boolean;

  @Column({ type: 'datetime' })
  createdAt: string;

  @Column({ type: 'datetime', nullable: true })
  planToFinishAt: string;

  @Column({ type: 'datetime', nullable: true })
  actuallyFinishedAt: string;

  // ============
  // relations
  // ============

  @ManyToOne(type => User, user => user.todos, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(type => Todo, todo => todo.subTodos, { onDelete: 'CASCADE' })
  rootTodo: Todo;

  @OneToMany(type => Todo, todo => todo.rootTodo)
  subTodos: Todo[];

  // =============
  // utilities
  // =============

  get isRoot(): boolean {
    return !this.rootTodo;
  }
}
