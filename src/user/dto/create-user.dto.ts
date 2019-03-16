import { Length, Matches } from 'class-validator';

export class CreateUserDto {

  /**
   * 用户名长度为6至25个字符，只能使用字母、数字和下划线
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @Matches(/^[a-zA-Z0-9_-]{6,25}$/, {
    message: '用户名长度为6至25个字符，只能使用字母数字和下划线',
  })
  readonly username: string;

  /**
   * 用户昵称长度为1至25个字符
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @Length(1, 25, {
    message: '用户昵称长度为1至25个字符',
  })
  readonly nickname: string;

  /**
   * 密码长度为6至25个字符，只能使用字母数字和下划线
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @Matches(/^[a-zA-Z0-9_-]{6,25}$/, {
    message: '密码长度为6至25个字符，只能使用字母数字和下划线',
  })
  readonly password: string;
}
