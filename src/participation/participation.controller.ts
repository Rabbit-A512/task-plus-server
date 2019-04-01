import { Body, Controller, Delete, forwardRef, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/user/user.service';
import { EntityId } from 'src/utils/custom-types';

import { GroupService } from './../group/group.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { Participation } from './participation.entity';
import { ParticipationService } from './participation.service';

@Controller('participations')
@UseGuards(AuthGuard())
export class ParticipationController {
  constructor(
    private readonly participationService: ParticipationService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
  ) {}

  // use POST method to hold request body
  @Post('condition')
  findManyByCondition(
    @Body() condition: object,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.findManyByCondition(condition, skip, take);
  }

  @Post()
  createOne(@Body() createParticipationDto: CreateParticipationDto) {
    const { userId, groupId } = createParticipationDto;
    return this.userService.findOneById(userId).pipe(
      switchMap(user => this.groupService.findOneById(groupId)),
      switchMap(group => {
        const newParticipation = new Participation();
        _.assign(newParticipation, createParticipationDto);
        return this.participationService.createOne(newParticipation);
      }),
    );
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: EntityId) {
    return this.deleteOneById(id);
  }
}
