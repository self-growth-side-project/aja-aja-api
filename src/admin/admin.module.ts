import { Module } from '@nestjs/common';
import { AdminController } from './interfaces/controller/admin.controller';

@Module({
  controllers: [AdminController],
})
export class AdminModule {}
