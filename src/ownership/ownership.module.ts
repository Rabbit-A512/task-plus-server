import { Ownership } from './ownership.entity';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnershipService } from './ownership.service';
import { UserModule } from 'src/user/user.module';
import { GroupModule } from 'src/group/group.module';
import { OwnershipController } from './ownership.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ownership]),
    UserModule,
    forwardRef(() => GroupModule),
  ],
  controllers: [
    OwnershipController,
  ],
  providers: [
    OwnershipService,
  ],
  exports: [
    OwnershipService,
  ],
})
export class OwnershipModule {}
