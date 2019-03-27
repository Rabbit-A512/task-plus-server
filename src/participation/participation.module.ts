import { Participation } from './participation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participation]),
  ],
})
export class ParticipationModule {}
