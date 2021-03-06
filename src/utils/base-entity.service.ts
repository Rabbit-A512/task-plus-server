import { NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import { from, Observable, zip } from 'rxjs';
import { mapTo, switchMap, tap, map } from 'rxjs/operators';
import { Repository } from 'typeorm';

import { IEntityService } from './custom-interfaces/entity-service.interface';
import { EntityId } from './custom-types';
import { IResponseArray } from './custom-interfaces/response-array.interface';

/**
 * 实体服务基类，用于复用简单的CRUD方法
 *
 * @export
 * @class EntityService
 * @template TEntity 实体类型
 * @template TUpdateDto 实体对应的更新Dto类型
 */
export class BaseEntityService<TEntity, TUpdateDto> implements IEntityService<TEntity, TUpdateDto> {
  constructor(
    protected readonly repo: Repository<TEntity>,
    protected readonly relationsToLoad: string[] = [],
  ) {}

  findOneById(id: EntityId): Observable<TEntity> {
    return from(this.repo.findOne(id)).pipe(
      tap(entity => {
        if (!entity) {
          throw new NotFoundException();
        }
      }),
    );
  }

  findOneByCondition(condition: object): Observable<TEntity> {
    return from(this.repo.findOne(condition)).pipe(
      tap(entity => {
        if (!entity) {
          throw new NotFoundException();
        }
      }),
    );
  }

  findAll(skip?: number, take?: number): Observable<IResponseArray<TEntity>> {
    return from(this.repo.findAndCount({
      relations: this.relationsToLoad,
      skip,
      take,
    })).pipe(
      map(([entites, total]) => {
        return {
          data: entites,
          total,
        };
      }),
    );
  }

  findManyByCondition(condition: object, skip?: number, take?: number): Observable<IResponseArray<TEntity>> {
    return from(this.repo.findAndCount({
      relations: this.relationsToLoad,
      skip,
      take,
      where: condition,
    })).pipe(
      map(([entities, total]) => {
        return {
          data: entities,
          total,
        };
      }),
    );
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

  deleteOneById(id: EntityId): Observable<TEntity> {
    return this.findOneById(id).pipe(
      switchMap(entity => from(this.repo.delete(id)).pipe(
        mapTo(entity),
      )),
    );
    // return from(this.repo.delete(id));
  }

  static makeRequestArray<T>(data$: Observable<T[]>, total$: Observable<number>): Observable<IResponseArray<T>> {
    return zip(data$, total$).pipe(
      map(([data, total]) => {
        return {
          data,
          total,
        };
      }),
    );
  }
}
