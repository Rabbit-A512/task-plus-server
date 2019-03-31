import { InjectRepository } from '@nestjs/typeorm';
import { Participation } from './participation.entity';
import { Injectable } from '@nestjs/common';
import { BaseEntityService } from 'src/utils/base-entity.service';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipationService extends BaseEntityService<Participation, any> {
  constructor(
    @InjectRepository(Participation)
    private readonly participationRepository: Repository<Participation>,
  ) {
    super(participationRepository);
  }
}
