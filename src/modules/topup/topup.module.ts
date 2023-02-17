import { Module } from '@nestjs/common';
import { TopupService } from './topup.service';
import { TopupController } from './topup.controller';

@Module({
  controllers: [TopupController],
  providers: [TopupService]
})
export class TopupModule {}
