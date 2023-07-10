import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}
  create(createGameDto: CreateGameDto) {
    try {
      console.log('Creating game', createGameDto);
      return this.gamesRepository.save({
        created_at: new Date(),
        status: 'created',
        ...createGameDto,
      });
    } catch (error) {
      console.log('Error creating game: ', error);
      return error;
    }
  }

  //find where room id = room id and status = created
  async findCreatedGameByRoomId(roomId: number) {
    try {
      console.log('Finding created game by room id', roomId);
      const game = await this.gamesRepository.findOne({
        where: { roomId, status: 'created' },
      });
      console.log('Found created game', game);
      return game;
    } catch (error) {
      console.log('Error finding created game: ', error);
      return error;
    }
  }

  findAll() {
    return `This action returns all games`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
