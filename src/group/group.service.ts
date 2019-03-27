import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { BaseEntityService } from './../utils/base-entity.service';
import { Injectable } from '@nestjs/common';
import { Group } from './group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService extends BaseEntityService<Group, UpdateGroupDto> {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {
    super(groupRepository);
  }
}
