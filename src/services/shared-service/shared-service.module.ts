import { Module } from '@nestjs/common';
import { SharedServiceController } from './shared-service.controller';
import { SharedServiceService } from './shared-service.service';

@Module({
  controllers: [SharedServiceController],
  providers: [SharedServiceService],
})
export class SharedServiceModule {}
