import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseEntityService } from 'src/utils/base-entity.service';
import { EntityId } from 'src/utils/custom-types';
import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseEntityService<User, UpdateUserDto> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository, ['defaultGroup']);
  }

  findOneById(id: EntityId): Observable<User> {
    return super.findOneById(id).pipe(
      tap(user => {
        if (user.isDeleted) {
          throw new NotFoundException();
        }
      }),
    );
  }

  findOneByCondition(condition: object): Observable<User> {
    return super.findOneByCondition(condition).pipe(
      tap(user => {
        if (user.isDeleted) {
          throw new NotFoundException();
        }
      }),
    );
  }

  findAll(skip?: number, take?: number) {
    return super.findAll(skip, take).pipe(
      map(resArray => {
        resArray.data = resArray.data
          // .filter(user => !user.isDeleted)
          .map(user => _.omit(user, ['password', 'passwordHash']));
        return resArray;
      }),
    );
  }

  findManyByCondition(condition: object, skip?: number, take?: number) {
    return super.findManyByCondition(condition, skip, take).pipe(
      map(resArray => {
        resArray.data = resArray.data
          // .filter(user => !user.isDeleted)
          .map(user => _.omit(user, ['password', 'passwordHash']));
        return resArray;
      }),
    );
  }

  deleteOneById(id: EntityId): Observable<User> {
    return this.updateOneById(id, { isDeleted: true });
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
