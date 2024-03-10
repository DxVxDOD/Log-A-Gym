import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Status, status } from 'src/task/task.module';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(status)
  status: Status;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
