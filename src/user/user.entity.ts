import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
