import { MinLength } from 'class-validator';

export class UpdateGroupDto {
  /**
   * 长度验证
   *
   * @type {string}
   * @memberof UpdateGroupDto
   */
  @MinLength(1)
  name: string;
}
