import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [
    UserController,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SharedModule,
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {}
