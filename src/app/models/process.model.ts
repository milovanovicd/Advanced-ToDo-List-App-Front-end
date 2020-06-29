import { Todo } from './todo.model'
import { User } from './user.model';

export class Process {
  constructor(
    public processId: number,
    public name: string,
    public priority: number,
    public user: User,
    public ToDoList:Todo[]
  ) {}
}
