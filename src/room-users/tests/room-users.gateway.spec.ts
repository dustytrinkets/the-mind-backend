import { Test, TestingModule } from '@nestjs/testing';
import { RoomUsersGateway } from '../room-users.gateway';

describe('RoomUsersGateway', () => {
  let gateway: RoomUsersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomUsersGateway],
    }).compile();

    gateway = module.get<RoomUsersGateway>(RoomUsersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
