import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseEntityService } from './../utils/base-entity.service';
import { Ownership } from './ownership.entity';

@Injectable()
export class OwnershipService extends BaseEntityService<Ownership, any> {
  constructor(
    @InjectRepository(Ownership)
    private readonly ownershipRepository: Repository<Ownership>,
  ) {
    super(ownershipRepository, ['group']);
  }
}
