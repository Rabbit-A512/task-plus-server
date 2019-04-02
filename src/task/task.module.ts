import { SharedModule } from './../shared/shared.module';
import { UserModule } from 'src/user/user.module';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UserModule,
    SharedModule,
  ],
  controllers: [
    TaskController,
  ],
  providers: [
    TaskService,
  ],
})
export class TaskModule {}
