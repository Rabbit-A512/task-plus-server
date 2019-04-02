import { UpdateTaskDto } from './dto/update-task.dto';
import { BaseEntityService } from './../utils/base-entity.service';
import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService extends BaseEntityService<Task, UpdateTaskDto> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository, ['children', 'parent']);
  }
}
