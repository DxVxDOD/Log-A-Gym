import { Injectable, NotFoundException } from '@nestjs/common';
import { Status, Task } from 'src/task/task.module';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks({ status, search }: GetTaskFilterDto) {
    if (status) {
      this.tasks = this.tasks.filter((task) => task.status === status);
    }
    if (search) {
      this.tasks = this.tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      title,
      description,
      id: v4(),
      status: 'OPEN',
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, { title, description }: CreateTaskDto): Task {
    const oldTask = this.getTaskById(id);

    const newTask: Task = {
      ...oldTask,
      title,
      description,
    };

    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasks.push(newTask);

    return newTask;
  }

  updateTaskStatus(id: string, status: Status): Task {
    const oldTask = this.getTaskById(id);

    const newStatusTask: Task = {
      ...oldTask,
      status,
    };

    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasks.push(newStatusTask);

    return newStatusTask;
  }

  deleteTask(id: string) {
    this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
