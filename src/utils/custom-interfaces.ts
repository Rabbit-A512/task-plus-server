import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';

import { EntityId } from './custom-types';

export interface IEntityService<TEntity, TUpdateDto> {

  findOneById(id: EntityId): Observable<TEntity>;

  findOneByCondition(condition: object): Observable<TEntity>;

  findAll(): Observable<TEntity[]>;

  findManyByCondition(condition: object): Observable<TEntity[]>;

  /**
   * 因为泛型无法new，所以需要在Controller中构造Entity并传入
   *
   * @param {TEntity} newEntity 等待插入的新实体
   * @returns {Observable<TEntity>} 插入结果
   * @memberof IEntityService
   */
  createOne(newEntity: TEntity): Observable<TEntity>;

  updateOneById(id: EntityId, updateDto: TUpdateDto): Observable<TEntity>;

  deleteOneById(id: EntityId): Observable<DeleteResult>;
}
