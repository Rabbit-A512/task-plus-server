import { Ownership } from './ownership.entity';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnershipService } from './ownership.service';
import { UserModule } from 'src/user/user.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ownership]),
    UserModule,
    forwardRef(() => GroupModule),
  ],
  providers: [
    OwnershipService,
  ],
  exports: [
    OwnershipService,
  ],
})
export class OwnershipModule {}
