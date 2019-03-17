import { NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DeleteResult, Repository } from 'typeorm';

import { EntityId } from './custom-types';

/**
 * 实体服务基类，用于复用简单的CRUD方法
 *
 * @export
 * @class EntityService
 * @template TEntity 实体类型
 * @template TUpdateDto 实体对应的更新Dto类型
 */
export class EntityService<TEntity, TUpdateDto> {
  constructor(private readonly repo: Repository<TEntity>) {}

  findOneById(id: EntityId): Observable<TEntity> {
    return from(this.repo.findOne(id));
  }

  findOneByCondition(condition: object): Observable<TEntity> {
    return from(this.repo.findOne(condition));
  }

  findAll(): Observable<TEntity[]> {
    return from(this.repo.find());
  }

  findManyByCondition(condition: object): Observable<TEntity[]> {
    return from(this.repo.find(condition));
  }

  /**
   * 因为泛型无法new，所以需要在Controller中构造Entity并传入
   *
   * @param {TEntity} newEntity 等待插入的新实体
   * @returns {Observable<TEntity>} 插入结果
   * @memberof EntityService
   */
  createOne(newEntity: TEntity): Observable<TEntity> {
    return from(this.repo.save(newEntity));
  }

  updateOneById(id: EntityId, updateDto: TUpdateDto): Observable<TEntity> {
    return this.findOneById(id).pipe(
      tap(entity => {
        if (!entity) {
          // 这里需要先抛出异常，否则下一步entity为空再保存，会导致插入新实体
          throw new NotFoundException();
        }
      }),
      switchMap(entity => {
        _.assign(entity, updateDto);
        return from(this.repo.save(entity));
      }),
    );
  }

  deleteOneById(id: EntityId): Observable<DeleteResult> {
    return from(this.repo.delete(id));
  }
}
