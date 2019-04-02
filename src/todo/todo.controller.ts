import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';
import { switchMap } from 'rxjs/operators';
import { PaginationArgPipe } from 'src/shared/pipes/paginationArg.pipe';
import { EntityId } from 'src/utils/custom-types';

import { IAuthorizedReq } from '../user/interfaces/authorized-req.interface';
import { UserService } from './../user/user.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
  ) {}

  @Get()
  findAll(
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
  ) {
    return this.todoService.findAll(skip, take);
  }

  @Get(':id')
  findOneById(@Param('id') id: EntityId) {
    return this.todoService.findOneById(id);
  }

  @Post('condition')
  findManyByCondition(
    @Body() condition: object,
    @Query('skip', PaginationArgPipe) skip?: number,
    @Query('take', PaginationArgPipe) take?: number,
  ) {
    return this.todoService.findManyByCondition(condition, skip, take);
  }

  @Post()
  createRoot(
    @Req() req: IAuthorizedReq,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    const userId = req.user.id;
    return this.userService.findOneById(userId).pipe(
      switchMap(user => {
        const todo = new Todo();
        _.assign(todo, createTodoDto, {
          user,
          rootTodo: null,
        });
        return this.todoService.createOne(todo);
      }),
    );
  }

  @Post(':id/sub-todos')
  createSub(
    @Param('id') rootTodoId: EntityId,
    @Req() req: IAuthorizedReq,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    const userId = req.user.id;
    return this.userService.findOneById(userId).pipe(
      switchMap(user => this.todoService.findOneById(rootTodoId).pipe(
        switchMap(rootTodo => {
          const newSubTodo = new Todo();
          _.assign(newSubTodo, createTodoDto, {
            user,
            rootTodo,
          });
          return this.todoService.createOne(newSubTodo);
        }),
      )),
    );
  }

  @Put(':id')
  updateOneById(@Param('id') id: EntityId, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateOneById(id, updateTodoDto);
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: EntityId) {
    return this.todoService.deleteOneById(id);
  }
}
