import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task } from 'src/task/task.module';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksSerivce: TasksService) {}

  @Get()
  getTasks(@Query() filterQuery: GetTaskFilterDto): Task[] {
    if (Object.keys(filterQuery).length) {
      return this.tasksSerivce.getFilteredTasks(filterQuery);
    } else {
      return this.tasksSerivce.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksSerivce.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksSerivce.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksSerivce.updateTask(id, createTaskDto);
  }

  @Patch('/:id/status')
  updateStatusTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    console.log(updateTaskStatusDto);
    const { status } = updateTaskStatusDto;
    return this.tasksSerivce.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksSerivce.deleteTask(id);
  }
}
