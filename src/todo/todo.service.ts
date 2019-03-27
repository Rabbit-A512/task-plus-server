import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseEntityService } from 'src/utils/base-entity.service';
import { IResponseArray } from 'src/utils/custom-interfaces/response-array.interface';
import { Repository } from 'typeorm';

import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService extends BaseEntityService<Todo, UpdateTodoDto> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {
    super(todoRepository);
  }

  findAll(skip?: number, take?: number): Observable<IResponseArray<Todo>> {
    return from(this.todoRepository.findAndCount({
      relations: ['children'],
      skip,
      take,
    })).pipe(
      map(([todos, total]) => {
        return {
          data: todos,
          total,
        };
      }),
    );
  }
}
