import { IsOptional, Length, Min, Validate, IsDateString, IsISO8601 } from 'class-validator';
import { IsLessThan } from 'src/utils/custom-constraint';

/**
 * 创建Todo时不能指定isFinished和actuallyFinishedAt
 *
 * @export
 * @class CreateTodoDto
 */
export class CreateTodoDto {

  @Length(1, 100)
  title: string;

  /**
   * 描述可以为空
   *
   * @type {string}
   * @memberof CreateTodoDto
   */
  @Length(0, 500)
  @IsOptional()
  description: string;

  // isFinished: boolean;

  /**
   * 前端发送请求时需要提供创建timestamp（在加载表单页面同时生成timestamp，为了在时间控件中屏蔽无效时间）
   *
   * @type {number}
   * @memberof CreateTodoDto
   */
  @Validate(IsLessThan, ['planToFinishAt'])
  @IsISO8601()
  createdAt: string;

  /**
   * 创建Todo时可以不指定预期完成时间
   *
   * @type {number}
   * @memberof CreateTodoDto
   */
  @IsISO8601()
  @IsOptional()
  planToFinishAt: number;

  // actuallyFinishedAt: number;
}
