import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    UserModule,
    SharedModule,
  ],
  controllers: [
    TodoController,
  ],
  providers: [
    TodoService,
  ],
})
export class TodoModule {}
