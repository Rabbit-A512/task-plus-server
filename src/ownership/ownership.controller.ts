import { Body, Controller, Delete, forwardRef, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';
import { switchMap } from 'rxjs/operators';
import { EntityId } from 'src/utils/custom-types';

import { GroupService } from './../group/group.service';
import { UserService } from './../user/user.service';
import { CreateOwnershipDto } from './dto/create-ownership.dto';
import { Ownership } from './ownership.entity';
import { OwnershipService } from './ownership.service';

@Controller('ownerships')
@UseGuards(AuthGuard())
export class OwnershipController {
  constructor(
    private readonly ownershipService: OwnershipService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
  ) {}

  // @Get()

  // use POST method to hold the request body
  @Post('condition')
  getManyByCondition(
    @Body() condition: object,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.ownershipService.findManyByCondition(condition, skip, take);
  }

  @Post()
  createOne(@Body() createOwnershipDto: CreateOwnershipDto) {
    const {
      ownerId,
      groupId,
    } = createOwnershipDto;
    return this.userService.findOneById(ownerId).pipe(
      switchMap(user => this.groupService.findOneById(groupId)),
      switchMap(group => {
        const newOwnerShip = new Ownership();
        _.assign(newOwnerShip, createOwnershipDto);
        return this.ownershipService.createOne(newOwnerShip);
      }),
    );
  }

  @Delete('id')
  deleteOneById(@Param('id') id: EntityId) {
    return this.ownershipService.deleteOneById(id);
  }
}
