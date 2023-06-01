import { Module } from '@nestjs/common';
import { UserRoomsService } from './user-rooms.service';
import { UserRoomsController } from './user-rooms.controller';

@Module({
  controllers: [UserRoomsController],
  providers: [UserRoomsService]
})
export class UserRoomsModule {}
