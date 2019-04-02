import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';
import { map, switchMap } from 'rxjs/operators';
import { Ownership } from 'src/ownership/ownership.entity';
import { OwnershipService } from 'src/ownership/ownership.service';
import { PaginationArgPipe } from 'src/shared/pipes/paginationArg.pipe';
import { IAuthorizedReq } from 'src/user/interfaces/authorized-req.interface';
import { EntityId } from 'src/utils/custom-types';

import { Participation } from './../participation/participation.entity';
import { ParticipationService } from './../participation/participation.service';
import { UserService } from './../user/user.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Controller('groups')
@UseGuards(AuthGuard())
export class GroupController {

  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => OwnershipService))
    private readonly ownershipService: OwnershipService,
    @Inject(forwardRef(() => ParticipationService))
    private readonly participationService: ParticipationService,
  ) {}

  @Get()
  findAll(
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
  ) {
    return this.groupService.findAll(skip, take);
  }

  @Get('own')
  findOwnGroups(
    @Req() req: IAuthorizedReq,
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
    ) {
    return this.groupService.findOwnedGroupsByUserId(req.user.id, skip, take);
  }

  @Get('owned/:user_id')
  findOwnedGroupsByUserId(
    @Param('user_id') userId: EntityId,
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
  ) {
    return this.groupService.findOwnedGroupsByUserId(userId, skip, take);
  }

  @Get('participated/:user_id')
  findParticipatedGroupsByUserId(
    @Param('user_id') userId: EntityId,
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
  ) {
    return this.groupService.findParticipatedGroupsByUserId(userId, skip, take);
  }

  @Get(':id')
  findOneById(@Param('id') id: EntityId) {
    return this.groupService.findOneById(id);
  }

  @Get(':id/owners')
  findOwnersByGroupId(@Param('id') groupId: EntityId) {
    return this.groupService.findOwnersByGroupId(groupId);
  }

  @Get(':id/participators')
  findParticipatorsByGroupId(@Param('id') groupId: EntityId) {
    return this.groupService.findParticipatorsByGroupId(groupId);
  }

  @Post()
  createOne(
    @Req() req: IAuthorizedReq,
    @Body() newGroup: CreateGroupDto,
  ) {
    const userId = req.user.id;
    return this.userService.findOneById(userId).pipe(
      switchMap(user => {
        const group = new Group();
        _.assign(group, newGroup);
        return this.groupService.createOne(group).pipe(
          switchMap(savedGroup => {
            const ownership = new Ownership();
            _.assign(ownership, {
              owner: user,
              group: savedGroup,
            });
            return this.ownershipService.createOne(ownership);
          }),
          switchMap(savedOwnership => {
            const newParticipation = new Participation();
            _.assign(newParticipation, {
              userId: savedOwnership.ownerId,
              groupId: savedOwnership.groupId,
            });
            return this.participationService.createOne(newParticipation);
          }),
        );
      }),
      map(ownership => ownership.group),
    );
  }

  @Put(':id')
  updateOneById(
    @Param('id') id: EntityId,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateOneById(id, updateGroupDto);
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: EntityId) {
    return this.groupService.deleteOneById(id);
  }
}
