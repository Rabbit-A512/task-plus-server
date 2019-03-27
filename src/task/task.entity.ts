import { Entity, ManyToOne } from 'typeorm';

import { Todo } from './../todo/todo.entity';
import { Group } from 'src/group/group.entity';

@Entity()
export class Task extends Todo {

  // =============
  // relations
  // =============

  @ManyToOne(type => Group, group => group.tasks, { onDelete: 'CASCADE' })
  group: Group;
}
