import { CreateTodoDto } from './../../todo/dto/create-todo.dto';
import { Allow, IsIn, IsNotEmpty } from 'class-validator';
import { TaskPriority } from '../task.entity';

export class CreateTaskDto extends CreateTodoDto {
  @IsNotEmpty()
  groupId: number;

  @IsIn([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH])
  priority: number;
}
