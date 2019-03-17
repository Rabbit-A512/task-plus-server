import { EntityId } from './../../utils/custom-types';
export interface IUserPayload {
  id: EntityId; // 在MySQL中使用bigint类型，拿出后JSON默认表示为字符串
  nickname: string;
}
