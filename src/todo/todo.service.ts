import { UpdateTodoDto } from './dto/update-todo.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { BaseEntityService } from 'src/utils/base-entity.service';
import { Observable, from } from 'rxjs';

@Injectable()
export class TodoService extends BaseEntityService<Todo, UpdateTodoDto> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {
    super(todoRepository);
  }

  findAll(): Observable<Todo[]> {
    return from(this.todoRepository.find({ relations: ['subTodos'] }));
  }
}
