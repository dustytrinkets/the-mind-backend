import { Module } from '@nestjs/common';
import { RoomUsersService } from './room-users.service';
import { RoomUsersController } from './room-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomUser } from './entities/room-user.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RoomUsersGateway } from './room-users.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomUser]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [RoomUsersController],
  providers: [RoomUsersService, UsersService, RoomUsersGateway],
})
export class RoomUsersModule {}
