import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { DeleteResult, InsertResult, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneById(id: string): Observable<User> {
    return from(this.userRepository.findOne(id)).pipe(
      tap(user => {
        if (!user) {
          throw new NotFoundException();
        }
      }),
    );
  }

  findOneByUsername(username: string): Observable<User> {
    return from(this.userRepository.findOne({ username }));
  }

  findAll(): Observable<User[]> {
    // 这里查不到数据不手动报错，因为会返回空数组[]，前端处理
    return from(this.userRepository.find());
  }

  createOne(newUser: CreateUserDto): Observable<InsertResult> {
    return this.generateHashSimple(newUser.password).pipe(
      catchError(err => throwError(new Error(`hash failed: ${err}`))),
      switchMap(hash => {
        const user = new User();
        user.username = newUser.username;
        user.nickname = newUser.nickname;
        user.passwordHash = hash;
        return this.userRepository.insert(user);
      }),
    );
  }

  updateOneById(id: string, updatedUser: UpdateUserDto): Observable<User> {
    return this.findOneById(id).pipe(
      tap(user => {
        if (!user) {
          throw new NotFoundException();
        }
      }),
      switchMap(user => {
        Object.assign(user, updatedUser);
        return from(this.userRepository.save(user));
      }),
    );
  }

  deleteOneById(id: string): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }

  // =====================
  // 以下是工具方法
  // =====================

  /**
   * 简单的密码哈希，使用bcrypt库的“自动哈希”方案，默认进行10轮
   * @see https://www.npmjs.com/package/bcrypt
   * @param {string} password
   * @returns {Observable<string>}
   * @memberof UserService
   */
  generateHashSimple(password: string): Observable<string> {
    return from(bcrypt.hash(password, 10));
  }

  /**
   * 比较密码和数据库中哈希值
   *
   * @param {(string | undefined)} password 待比较的明文密码
   * @param {(string | undefined)} hash 哈希值
   * @returns {Observable<boolean>} 使用Observable包裹的比较结果表示是否匹配
   * @memberof UserService
   */
  compareHash(password: string | undefined, hash: string | undefined): Observable<boolean> {
    return from(bcrypt.compare(password, hash));
  }
}
