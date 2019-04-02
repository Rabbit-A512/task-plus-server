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

  @ManyToOne(type => User, user => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => Todo, todo => todo.children, { onDelete: 'CASCADE' })
  parent: Todo;

  @Column({ nullable: true })
  parentId: number;

  @OneToMany(type => Todo, todo => todo.parent)
  children: Todo[];

  // =============
  // utilities
  // =============

  get isRoot(): boolean {
    return !this.parent;
  }
}
