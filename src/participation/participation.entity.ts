import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participation {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(type => User, user => user.participations, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(type => Group, group => group.participations, { onDelete: 'CASCADE' })
  group: Group;

  @Column({ nullable: true })
  userId: number; // for query purpose

  @Column({ nullable: true })
  groupId: number; // for query purpose
}
