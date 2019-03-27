/**
 * 这个DTO并不直接暴露，所以不使用class-validator中的装饰器
 *
 * @export
 * @class CreateOwnershipDto
 */
export class CreateOwnershipDto {
  ownerId: number;
  groupId: number;
}
