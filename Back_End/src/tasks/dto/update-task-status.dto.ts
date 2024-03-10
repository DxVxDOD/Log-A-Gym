import { IsEnum } from 'class-validator';
import { Status, status } from 'src/task/task.module';

export class UpdateTaskStatusDto {
  @IsEnum(status)
  status: Status;
}
