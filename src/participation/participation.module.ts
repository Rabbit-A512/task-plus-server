import { ParticipationController } from './participation.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from 'src/group/group.module';

import { UserModule } from './../user/user.module';
import { Participation } from './participation.entity';
import { ParticipationService } from './participation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participation]),
    UserModule,
    forwardRef(() => GroupModule),
  ],
  controllers: [
    ParticipationController,
  ],
  providers: [
    ParticipationService,
  ],
  exports: [
    ParticipationService,
  ],
})
export class ParticipationModule {}
