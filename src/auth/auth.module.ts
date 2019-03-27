import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './stragies/jwt.stragy';

@Module({
  controllers: [
    AuthController,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule {}
