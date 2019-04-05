import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IUserPayload } from 'src/user/interfaces/user-payload.interface';

import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { IAuthInfo } from './interfaces/auth-info.interface';
import { IToken } from './interfaces/token.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  login(@Body() authInfo: IAuthInfo): Observable<IToken> {
    const { username, password } = authInfo;
    if (!username || !password) {
      return throwError(new BadRequestException('Username and password are required!'));
    }

    return this.userService.findOneByCondition({ username }).pipe(
      tap(user => {
        if (user === undefined) {
          // username doesnot exist
          throw new BadRequestException();
        }
      }),
      switchMap(user => this.userService.compareHash(password, user.passwordHash).pipe(
        map(isCorrectPassword => {
          if (!isCorrectPassword) {
            // wrong password
            throw new BadRequestException();
          } else {
            return user;
          }
        }),
      )),
      map(user => {
        const userPayload: IUserPayload = _.pick(user, ['id', 'nickname', 'defaultGroupId']);
        return this.authService.createToken(userPayload);
      }),
      catchError(err => {
        if (err instanceof BadRequestException) {
          // cannot provide the exact error when it comes to auth
          return throwError(new BadRequestException('Invalid username or password!'));
        } else {
          // other error
          return throwError(new InternalServerErrorException(err));
        }
      }),
    );
  }
}
