import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, throwError } from 'rxjs';
import { catchError, mapTo, switchMap, tap } from 'rxjs/operators';
import { IResponseArray } from 'src/utils/custom-interfaces/response-array.interface';

import { PaginationArgPipe } from './../shared/pipes/paginationArg.pipe';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IAuthorizedReq } from './interfaces/authorized-req.interface';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  findAll(
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
  ): Observable<IResponseArray<Partial<User>>> {
    return this.userService.findAll(skip, take);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Post('condition')
  findManyByCondition(
    @Body() condition: object,
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
  ) {
    return this.userService.findManyByCondition(condition, skip, take);
  }

  /**
   * 注册用户
   *
   * @param {CreateUserDto} newUser
   * @returns
   * @memberof UserController
   */
  @Post()
  create(@Body() newUser: CreateUserDto) {
    return this.userService.generateHashSimple(newUser.password).pipe(
      catchError(err => throwError(new Error(`hash failed: ${err}`))),
      switchMap(hash => {
        const user = new User();
        user.username = newUser.username;
        user.nickname = newUser.nickname;
        user.passwordHash = hash;
        return this.userService.createOne(user);
      }),
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  updateOneById(@Param('id') id: string, @Body() updatedUser: UpdateUserDto) {
    return this.userService.updateOneById(id, updatedUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteOneById(@Param('id') id: string) {
    return this.userService.deleteOneById(id);
  }

  @Post('change-password')
  @UseGuards(AuthGuard())
  changePassword(@Req() req: IAuthorizedReq, @Body() changePasswordDto: ChangePasswordDto) {
    const { id } = req.user;
    const {
      old_password,
      new_password,
    } = changePasswordDto;

    return this.userService.findOneById(id).pipe(
      switchMap(user => this.userService.compareHash(old_password, user.passwordHash).pipe(
        tap(isCorrectPassword => {
          if (!isCorrectPassword) {
            throw new BadRequestException('旧密码错误');
          }
        }),
        switchMap(isCorrectPassword => this.userService.generateHashSimple(new_password)),
      )),
      switchMap(newHash => this.userService.updateOneById(id, { passwordHash: newHash })),
      mapTo({ message: '密码更新成功' }),
    );
  }
}
