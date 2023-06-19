import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Logger } from '@nestjs/common';

const loggerContext = 'RoomsController';
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    const room = this.roomsService.create(createRoomDto);
    return room;
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Get('/code/:code')
  async findOneByRoomCode(@Param('code') code: string) {
    Logger.log(`Retrieving room with code ${code}`, loggerContext);
    const room = await this.roomsService.findOneByRoomCode(code);
    Logger.log(`Retrieved room: ${JSON.stringify(room)}`, loggerContext);
    if (!room) {
      Logger.log('Room not found: ', code);
      return null;
    }
    return room;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
