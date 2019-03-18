import { UpdateTodoDto } from './dto/update-todo.dto';
import { Body, Controller, Get, Param, Post, Req, UseGuards, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EntityId } from 'src/utils/custom-types';
import * as _ from 'lodash';

import { IAuthorizedReq } from '../user/interfaces/authorized-req.interface';
import { UserService } from './../user/user.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { switchMap } from 'rxjs/operators';
import { Todo } from './todo.entity';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
  ) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: EntityId) {
    return this.todoService.findOneById(id);
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
