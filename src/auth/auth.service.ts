import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IUserPayload } from '../user/interfaces/user-payload.interface';
import { UserService } from './../user/user.service';
import { IToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(userPayload: IUserPayload): IToken {
    return {
      expiresIn: '7 days',
      token: this.jwtService.sign(userPayload),
    };
  }

  async validateUser(payload: IUserPayload): Promise<IUserPayload> {
    return this.userService.findOneById(payload.id).pipe(
      catchError(err => {
        if (err instanceof NotFoundException) {
          return of(null);
        } else {
          return throwError(err);
        }
      }),
      map(user => user ? payload : null),
    ).toPromise();
  }
}
