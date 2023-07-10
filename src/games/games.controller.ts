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
    const game = await this.gamesService.create(createGameDto);
    Logger.log(`Game created: ${JSON.stringify(game)}`, loggerContext);
    return game;
  }

  @Get('/created/:roomId')
  async findCreatedGameByRoomId(@Param('roomId') roomId: number) {
    Logger.log(`Finding created game by room id: ${roomId}`, loggerContext);
    const game = await this.gamesService.findCreatedGameByRoomId(roomId);
    Logger.log(`Found created game: ${JSON.stringify(game)}`, loggerContext);
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
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
