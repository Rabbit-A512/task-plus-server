import { Participation } from './../participation/participation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Ownership } from 'src/ownership/ownership.entity';
import { Task } from 'src/task/task.entity';

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
}
