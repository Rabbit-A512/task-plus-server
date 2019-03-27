import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { OwnershipModule } from './ownership/ownership.module';
import { ParticipationModule } from './participation/participation.module';
import { TaskModule } from './task/task.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    TodoModule,
    GroupModule,
    OwnershipModule,
    ParticipationModule,
    TaskModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
