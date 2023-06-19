import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoomUser } from './entities/room-user.entity';
import { CreateRoomUserDto } from './dto/create-room-user.dto';
import { UpdateRoomUserDto } from './dto/update-room-user.dto';

@Injectable()
export class RoomUsersService {
  constructor(
    @InjectRepository(RoomUser)
    private roomUsersRepository: Repository<RoomUser>,
  ) {}
  create(createRoomUserDto: CreateRoomUserDto) {
    try {
      return this.roomUsersRepository.save({
        created_at: new Date(),
        ...createRoomUserDto,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll() {
    return `This action returns all roomUsers`;
  }

  findUsersByRoomId(roomId: any) {
    return this.roomUsersRepository.find({
      where: {
        id: roomId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} roomUser`;
  }

  update(id: number, updateRoomUserDto: UpdateRoomUserDto) {
    return `This action updates a #${id} roomUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomUser`;
  }
}
