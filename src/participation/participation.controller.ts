import { Participation } from './participation.entity';
import { GroupService } from './../group/group.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { ParticipationService } from './participation.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, UseGuards, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { EntityId } from 'src/utils/custom-types';

@Controller('participations')
@UseGuards(AuthGuard())
export class ParticipationController {
  constructor(
    private readonly participationService: ParticipationService,
    private readonly userService: UserService,
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

  @Delete('id')
  deleteOneById(@Param('id') id: EntityId) {
    return this.deleteOneById(id);
  }
}
