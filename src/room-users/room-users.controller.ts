import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RoomUsersService } from './room-users.service';
import { CreateRoomUserDto } from './dto/create-room-user.dto';
import { Logger } from '@nestjs/common';

const loggerContext = 'RoomUsersController';

@Controller('room-users')
export class RoomUsersController {
  constructor(private readonly roomUsersService: RoomUsersService) {}

  @Post()
  create(@Body() createRoomUserDto: CreateRoomUserDto) {
    return this.roomUsersService.create(createRoomUserDto);
  }

  @Get()
  findAll() {
    return this.roomUsersService.findAll();
  }

  @Get('/:room_id')
  async findUsersByRoomId(@Param('room_id') room_id: number) {
    Logger.log(`Retrieving users in room ${room_id}`, loggerContext);
    const users = await this.roomUsersService.findUsersByRoomId(room_id);
    Logger.log(`Retrieved users: ${JSON.stringify(users)}`, loggerContext);
    if (!users) {
      Logger.log('Users not found');
      return null;
    }
    return users;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomUsersService.remove(+id);
  }
}
