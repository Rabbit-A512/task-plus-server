import { Length, Matches, IsOptional } from 'class-validator';

export class UpdateUserDto {

  /**
   * 用户昵称长度为1至25个字符
   *
   * @type {string}
   * @memberof UpdateUserDto
   */
  @Length(1, 25, {
    message: '用户昵称长度为1至25个字符',
  })
  @IsOptional()
  readonly nickname?: string;

  /**
   * 密码哈希值，写在这里是为了复用UserService的update方法
   *
   * @type {string}
   * @memberof UpdateUserDto
   */
  @IsOptional()
  readonly passwordHash: string;
}