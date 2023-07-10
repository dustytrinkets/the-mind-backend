import { Module } from '@nestjs/common';
import { RoomUsersService } from './room-users.service';
import { RoomUsersController } from './room-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomUser } from './entities/room-user.entity';
import { RoomUsersGateway } from './room-users.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([RoomUser])],
  controllers: [RoomUsersController],
  providers: [RoomUsersService, RoomUsersGateway],
})
export class RoomUsersModule {}
