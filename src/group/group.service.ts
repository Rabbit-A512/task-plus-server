import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/user/user.entity';
import { IResponseArray } from 'src/utils/custom-interfaces/response-array.interface';
import { EntityId } from 'src/utils/custom-types';
import { Repository } from 'typeorm';

import { BaseEntityService } from './../utils/base-entity.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupService extends BaseEntityService<Group, UpdateGroupDto> {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(groupRepository);
  }

  /**
   * 查找某个用户拥有的组织
   *
   * @param {EntityId} userId 用户id
   * @param {number} [skip] 分页参数skip
   * @param {number} [take] 分页参数take
   * @returns {Observable<IResponseArray<Group>>} 查询结果
   * @memberof GroupService
   */
  findOwnedGroupsByUserId(userId: EntityId, skip?: number, take?: number): Observable<IResponseArray<Group>> {
    const qb = this.groupRepository.createQueryBuilder('group')
      .innerJoin('group.ownerships', 'ownership', 'ownership.ownerId = :ownerId', { ownerId: userId });
    const groups$ = from(qb.skip(skip).take(take).getMany());
    const total$ = from(qb.getCount());

    return BaseEntityService.makeRequestArray(groups$, total$);
  }

  /**
   * 查询某个用户参加的组织
   *
   * @param {EntityId} userId 用户id
   * @param {number} [skip] 分页参数skip
   * @param {number} [take] 分页参数take
   * @returns {Observable<IResponseArray<Group>>} 查询结果
   * @memberof GroupService
   */
  findParticipatedGroupsByUserId(userId: EntityId, skip?: number, take?: number): Observable<IResponseArray<Group>> {
    const qb = this.groupRepository.createQueryBuilder('group')
      .innerJoin('group.participations', 'participation', 'participation.userId = :userId', { userId });
    const groups$ = from(qb.skip(skip).take(take).getMany());
    const total$ = from(qb.getCount());

    return BaseEntityService.makeRequestArray(groups$, total$);
  }

  findOwnersByGroupId(groupId: EntityId, skip?: number, take?: number): Observable<IResponseArray<User>> {
    const qb = this.userRepository.createQueryBuilder('user')
      .innerJoin('user.ownerships', 'ownership', 'ownership.groupId = :groupId', { groupId });
    const owners$ = from(qb.skip(skip).take(take).getMany());
    const total$ = from(qb.getCount());

    return BaseEntityService.makeRequestArray(owners$, total$);
  }

  findParticipatorsByGroupId(groupId: EntityId, skip?: number, take?: number): Observable<IResponseArray<User>> {
    const qb = this.userRepository.createQueryBuilder('user')
      .innerJoin('user.participations', 'participation', 'participation.groupId = :groupId', { groupId });
    const participators$ = from(qb.skip(skip).take(take).getMany());
    const total$ = from(qb.getCount());

    return BaseEntityService.makeRequestArray(participators$, total$);
  }
}
