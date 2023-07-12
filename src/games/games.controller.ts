import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Logger } from '@nestjs/common';

import { generateGameNumbers } from './utils/generateGameNumbers';

const loggerContext = 'GamesController';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    Logger.log(
      `Creating game: ${JSON.stringify(createGameDto)}`,
      loggerContext,
    );
    const numbers = generateGameNumbers(createGameDto.numPlayers);
    const game = await this.gamesService.create(createGameDto);
    Logger.log(`Game created: ${JSON.stringify(game)}`, loggerContext);
    // TODO: save numbers to DB
    return { ...game, numbers };
  }

  @Get('/active/:roomId')
  async findCreatedGameByRoomId(@Param('roomId') roomId: number) {
    Logger.log(`Finding active game by room id: ${roomId}`, loggerContext);
    const game = await this.gamesService.findActiveGameByRoomId(roomId);
    Logger.log(`Found active game: ${JSON.stringify(game)}`, loggerContext);
    return game;
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.updateStatus(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
