import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
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
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {}
