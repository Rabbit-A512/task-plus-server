import { Observable, from, zip } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseEntityService } from './../utils/base-entity.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './group.entity';
import { EntityId } from 'src/utils/custom-types';
import { IResponseArray } from 'src/utils/custom-interfaces/response-array.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class GroupService extends BaseEntityService<Group, UpdateGroupDto> {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {
    super(groupRepository);
  }

  findOwnedGroupsByUserId(userId: EntityId, skip?: number, take?: number): Observable<IResponseArray<Group>> {
    const qb = this.groupRepository.createQueryBuilder('group')
      .innerJoin('group.ownerships', 'ownership', 'ownership.ownerId = :ownerId', { ownerId: userId });
    const groups$ = from(qb.skip(skip).take(take).getMany());
    const total$ = from(qb.getCount());

    return BaseEntityService.makeRequestArray(groups$, total$);
  }

  findParticipatedGroupsByUserId(userId: EntityId, skip?: number, take?: number): Observable<IResponseArray<Group>> {
    const qb = this.groupRepository.createQueryBuilder('group')
      .innerJoin('group.participations', 'participation', 'participation.userId = :userId', { userId });
    const groups$ = from(qb.skip(skip).take(take).getMany());
    const total$ = from(qb.getCount());

    return BaseEntityService.makeRequestArray(groups$, total$);
  }
}
