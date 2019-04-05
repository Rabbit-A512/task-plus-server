import { Ownership } from 'src/ownership/ownership.entity';
import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Participation } from './../participation/participation.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: string;

  // ===========
  // relations
  // ===========

  @OneToMany(type => Ownership, own => own.group)
  ownerships: Ownership[];

  @OneToMany(type => Participation, participation => participation.group)
  participations: Participation[];

  @OneToMany(type => Task, task => task.group)
  tasks: Task[];

  @OneToMany(type => User, user => user.defaultGroup)
  usersSetThisGroupAsDefault: User[];
}
