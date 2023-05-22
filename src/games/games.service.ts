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
    return this.gamesRepository.create(createGameDto);
  }

  async findAll(): Promise<Game[]> {
    const games = await this.gamesRepository.find();
    console.log(games);
    return games;
  }

  findOne(id: number): Promise<Game | null> {
    return this.gamesRepository.findOneBy({ id });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.gamesRepository.update(id, updateGameDto);
  }

  async remove(id: number): Promise<void> {
    await this.gamesRepository.delete(id);
  }
}
