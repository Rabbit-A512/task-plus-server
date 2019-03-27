/**
 * 返回多行数据时使用，用于分页
 *
 * @export
 * @interface IResponseArray
 * @template T
 */
export interface IResponseArray<T> {
  total: number;
  data: Partial<T>[];
}
