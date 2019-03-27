import { MinLength } from 'class-validator';

export class CreateGroupDto {
  /**
   * 长度验证
   *
   * @type {string}
   * @memberof CreateGroupDto
   */
  @MinLength(1)
  name: string;
}
