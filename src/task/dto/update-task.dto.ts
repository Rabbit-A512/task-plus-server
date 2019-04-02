import { IsIn } from 'class-validator';

import { TaskPriority } from '../task.entity';
import { UpdateTodoDto } from './../../todo/dto/update-todo.dto';

export class UpdateTaskDto extends UpdateTodoDto {
  @IsIn([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH])
  priority: number;
}
