import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import _ from 'lodash';
import { map, switchMap, tap, mapTo } from 'rxjs/operators';

import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IAuthorizedReq } from './interfaces/authorized-req.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.userService.findAll().pipe(
      map(users => users.map(user => _.omit(user, ['password', 'passwordHash']))),
    );
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
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
    return this.userService.createOne(newUser);
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
