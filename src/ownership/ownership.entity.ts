import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Group } from 'src/group/group.entity';

@Entity()
export class Ownership {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(type => User, user => user.ownerships, { onDelete: 'CASCADE' })
  owner: User;

  @ManyToOne(type => Group, group => group.ownerships, { onDelete: 'CASCADE' })
  group: Group;

  @Column({ nullable: true })
  ownerId: number; // for query purpose

  @Column({ nullable: true })
  groupId: number; // for query purpose
}
