import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import Str from '@supercharge/strings';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}
  create(createRoomDto: CreateRoomDto) {
    try {
      return this.roomsRepository.save({
        created_at: new Date(),
        code: Str.random(6).toUpperCase(),
        ...createRoomDto,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  findOne(id: number): Promise<Room | null> {
    return this.roomsRepository.findOneBy({ id });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomsRepository.update(id, updateRoomDto);
  }

  remove(id: number) {
    return this.roomsRepository.delete(id);
  }
}
