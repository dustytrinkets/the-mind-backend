import { Test, TestingModule } from '@nestjs/testing';
import { UserRoomsService } from './user-rooms.service';

describe('UserRoomsService', () => {
  let service: UserRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoomsService],
    }).compile();

    service = module.get<UserRoomsService>(UserRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
