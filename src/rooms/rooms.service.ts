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
      console.log('Creating room', createRoomDto);
      return this.roomsRepository.save({
        created_at: new Date(),
        code: Str.random(6).toUpperCase(),
        status: 'created',
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

  async findCreator(id: number): Promise<any | null> {
    const response = await this.roomsRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.creator', 'user')
      .where('room.id = :id', { id })
      .getOne();
    const creator = response.creator;
    return creator;
  }

  findOneByRoomCode(code: string): Promise<Room | null> {
    return this.roomsRepository.findOne({
      where: {
        code: code,
      },
    });
  }

  async updateStatus(id: number, updateRoomDto: UpdateRoomDto) {
    try {
      console.log('Updating room status', id, updateRoomDto);
      const room = await this.roomsRepository.findOne({
        where: { id },
      });
      console.log('Found room', room);
      return this.roomsRepository.save({
        ...room,
        ...updateRoomDto,
      });
    } catch (error) {
      console.log('Error updating room status: ', error);
      return error;
    }
  }

  remove(id: number) {
    return this.roomsRepository.delete(id);
  }
}
