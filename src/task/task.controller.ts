import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';
import { PaginationArgPipe } from 'src/shared/pipes/paginationArg.pipe';
import { IAuthorizedReq } from 'src/user/interfaces/authorized-req.interface';
import { UserService } from 'src/user/user.service';
import { EntityId } from 'src/utils/custom-types';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  findAll(
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
  ) {
    return this.taskService.findAll(skip, take);
  }

  @Get(':id')
  findOneById(@Param('id') id: EntityId) {
    return this.taskService.findOneById(id);
  }

  @Post('condition')
  findManyByCondition(
    @Body() condition: object,
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
  ) {
    return this.taskService.findManyByCondition(condition, skip, take);
  }

  @Post()
  createOne(
    @Req() req: IAuthorizedReq,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    // const userId = req.user.id;
    const task = new Task();
    _.assign(task, createTaskDto);
    return this.taskService.createOne(task);
  }

  @Put(':id')
  updateOneById(@Param('id') id: EntityId, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateOneById(id, updateTaskDto);
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: EntityId) {
    return this.taskService.deleteOneById(id);
  }
}
