import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoomUser } from './entities/room-user.entity';
import { User } from 'src/users/entities/user.entity';
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

  async findUsersByRoomId(roomId: number): Promise<any> {
    const response = await this.roomUsersRepository
      .createQueryBuilder('room_user')
      .leftJoinAndSelect('room_user.user', 'user')
      .where('room_user.room_id = :roomId', { roomId })
      .getMany();
    const users = response.map((roomUser) => roomUser.user);
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomUser`;
  }
}
