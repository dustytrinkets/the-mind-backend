import { Injectable } from '@nestjs/common';
import { CreateUserRoomDto } from './dto/create-user-room.dto';
import { UpdateUserRoomDto } from './dto/update-user-room.dto';

@Injectable()
export class UserRoomsService {
  create(createUserRoomDto: CreateUserRoomDto) {
    return 'This action adds a new userRoom';
  }

  findAll() {
    return `This action returns all userRooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRoom`;
  }

  update(id: number, updateUserRoomDto: UpdateUserRoomDto) {
    return `This action updates a #${id} userRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRoom`;
  }
}
