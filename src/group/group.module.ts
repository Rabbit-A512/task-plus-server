import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnershipModule } from 'src/ownership/ownership.module';

import { ParticipationModule } from './../participation/participation.module';
import { UserModule } from './../user/user.module';
import { GroupController } from './group.controller';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    UserModule,
    forwardRef(() => OwnershipModule),
    forwardRef(() => ParticipationModule),
  ],
  controllers: [
    GroupController,
  ],
  providers: [
    GroupService,
  ],
  exports: [
    GroupService,
  ],
})
export class GroupModule {}
