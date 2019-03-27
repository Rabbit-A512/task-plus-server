import { Controller, Get } from '@nestjs/common';
import { OwnershipService } from './ownership.service';

@Controller('ownerships')
export class OwnershipController {
  constructor(
    private readonly ownershipService: OwnershipService,
  ) {}

  // @Get()
}
