import { Ownership } from './ownership.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnershipService } from './ownership.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ownership]),
  ],
  providers: [
    OwnershipService,
  ],
  exports: [
    OwnershipService,
  ],
})
export class OwnershipModule {}
