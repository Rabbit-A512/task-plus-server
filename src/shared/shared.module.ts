import { PaginationArgPipe } from './pipes/paginationArg.pipe';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    PaginationArgPipe,
  ],
  exports: [
    PaginationArgPipe,
  ],
})
export class SharedModule {}
