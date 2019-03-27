import { Observable } from 'rxjs';

import { EntityId } from '../custom-types';
import { IResponseArray } from './response-array.interface';



export interface IEntityService<TEntity, TUpdateDto> {

  findOneById(id: EntityId): Observable<TEntity>;

  // use findManyByCondition() instead
  // findOneByCondition(condition: object): Observable<TEntity>;

  findAll(): Observable<IResponseArray<TEntity>>;

  findManyByCondition(condition: object): Observable<IResponseArray<TEntity>>;

  /**
   * 因为泛型无法new，所以需要在Controller中构造Entity并传入
   *
   * @param {TEntity} newEntity 等待插入的新实体
   * @returns {Observable<TEntity>} 插入结果
   * @memberof IEntityService
   */
  createOne(newEntity: TEntity): Observable<TEntity>;

  updateOneById(id: EntityId, updateDto: TUpdateDto): Observable<TEntity>;

  deleteOneById(id: EntityId): Observable<TEntity>;
}
