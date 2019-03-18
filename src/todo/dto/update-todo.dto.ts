import { IsOptional, Length, Min } from 'class-validator';

/**
 * 更新Todo时不能指定createdAt
 *
 * @export
 * @class UpdateTodoDto
 */
export class UpdateTodoDto {

  @Length(1, 100)
  @IsOptional()
  title: string;

  @Length(0, 500)
  @IsOptional()
  description: string;

  @IsOptional()
  isFinished: boolean;

  // createdAt: nunber;

  @Min(0)
  @IsOptional()
  planToFinishAt: number;

  @Min(0)
  @IsOptional()
  actuallyFinishedAt: number;
}
