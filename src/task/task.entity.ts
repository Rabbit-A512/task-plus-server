import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Group } from './../group/group.entity';
import { User } from 'src/user/user.entity';

export enum TaskPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

@Entity()
export class Task {
  // 因为递归时类型暂时没找到办法处理，所以不继承Todo实体类

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

  @Column()
  priority: number;

  // ============
  // relations
  // ============

  @ManyToOne(type => User, user => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: number; // for query purpose

  @ManyToOne(type => Task, task => task.children, { onDelete: 'CASCADE' })
  parent: Task;

  @Column({ nullable: true })
  parentId: number;

  @OneToMany(type => Task, task => task.parent)
  children: Task[];

  @ManyToOne(type => Group, group => group.tasks, { onDelete: 'CASCADE' })
  group: Group;

  @Column({ nullable: true })
  groupId: number;

  // =============
  // utilities
  // =============

  get isRoot(): boolean {
    return !this.parent;
  }
}
