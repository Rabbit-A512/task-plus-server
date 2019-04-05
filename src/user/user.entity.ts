import { Group } from './../group/group.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Ownership } from './../ownership/ownership.entity';
import { Participation } from './../participation/participation.entity';
import { Task } from './../task/task.entity';
import { Todo } from './../todo/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number; // 因为是bigint，取出来JSON表示为string

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 50, unique: true })
  nickname: string;

  @Column({ length: 100, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  passwordHash: string;

  /**
   * 控制用户是否被删除（删除用户只改变此标志位，而不直接从DB中删除记录）
   *
   * @type {boolean}
   * @memberof User
   */
  @Column({ default: false })
  isDeleted: boolean;

  // ==============
  // relations
  // ==============

  @OneToMany(type => Todo, todo => todo.user)
  todos: Todo[];

  @OneToMany(type => Task, task => task.user)
  tasks: Task[];

  @OneToMany(type => Ownership, ownership => ownership.owner)
  ownerships: Ownership[];

  @OneToMany(type => Participation, participation => participation.user)
  participations: Participation[];

  @ManyToOne(type => Group, group => group.usersSetThisGroupAsDefault, { onDelete: 'SET NULL', nullable: true })
  defaultGroup: Group;

  @Column({ nullable: true })
  defaultGroupId: number;

}
