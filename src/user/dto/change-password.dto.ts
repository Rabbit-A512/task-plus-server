import { Matches, Allow } from 'class-validator';

export class ChangePasswordDto {
  /**
   * 旧密码，没有必要做格式验证
   *
   * @type {string}
   * @memberof ChangePasswordDto
   */
  @Allow() // <-- prevent being stripped from whitelist
  readonly old_password: string;

  /**
   * 新密码，密码长度为6至25个字符，只能使用字母数字和下划线
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @Matches(/^[a-zA-Z0-9_-]{6,25}$/, {
    message: '密码长度为6至25个字符，只能使用字母数字和下划线',
  })
  readonly new_password: string;
}
