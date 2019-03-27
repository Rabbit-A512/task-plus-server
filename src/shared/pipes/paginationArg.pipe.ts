import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PaginationArgPipe implements PipeTransform<string, number | undefined> {
  transform(value: string, metadata: ArgumentMetadata): number | undefined {
    if (!value) {
      // 查询参数没有提供时不应报错
      return undefined;
    }
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(`Cannot parse value: '${value}' to number`);
    }
    return val;
  }
}
