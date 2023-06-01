import { Test, TestingModule } from '@nestjs/testing';
import { UserRoomsController } from './user-rooms.controller';
import { UserRoomsService } from './user-rooms.service';

describe('UserRoomsController', () => {
  let controller: UserRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoomsController],
      providers: [UserRoomsService],
    }).compile();

    controller = module.get<UserRoomsController>(UserRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
