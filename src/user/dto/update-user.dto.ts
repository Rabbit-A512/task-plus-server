import { IsOptional, Length } from 'class-validator';

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
  nickname?: string;

  /**
   * 密码哈希值，写在这里是为了复用UserService的update方法
   *
   * @type {string}
   * @memberof UpdateUserDto
   */
  @IsOptional()
  passwordHash?: string;

  /**
   * 表示用户是否已被删除，写在这里为了复用update方法
   *
   * @type {boolean}
   * @memberof UpdateUserDto
   */
  @IsOptional()
  isDeleted?: boolean;
}
