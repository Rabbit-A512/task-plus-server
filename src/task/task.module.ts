import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
  ],
})
export class TaskModule {}
