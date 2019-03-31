import { UserModule } from './../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { OwnershipModule } from 'src/ownership/ownership.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    UserModule,
    forwardRef(() => OwnershipModule),
  ],
  controllers: [
    GroupController,
  ],
  providers: [
    GroupService,
  ],
})
export class GroupModule {}
