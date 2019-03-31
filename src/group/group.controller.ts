import { UpdateGroupDto } from './dto/update-group.dto';
import { Body, Controller, Get, Param, Post, Req, UseGuards, Put, Delete, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';
import { map, switchMap } from 'rxjs/operators';
import { Ownership } from 'src/ownership/ownership.entity';
import { OwnershipService } from 'src/ownership/ownership.service';
import { IAuthorizedReq } from 'src/user/interfaces/authorized-req.interface';
import { EntityId } from 'src/utils/custom-types';

import { UserService } from './../user/user.service';
import { CreateGroupDto } from './dto/create-group.dto';
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
  ) {}

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: EntityId) {
    return this.groupService.findOneById(id);
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
        );
      }),
      map(ownership => ownership.group),
    );
  }

  @Put('id')
  updateOneById(
    @Param('id') id: EntityId,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateOneById(id, updateGroupDto);
  }

  @Delete('id')
  deleteOneById(@Param('id') id: EntityId) {
    return this.groupService.deleteOneById(id);
  }
}
