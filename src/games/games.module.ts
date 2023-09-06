import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { Game } from './entities/game.entity';
import { Participation } from '../participations/entities/participation.entity';
import { GamesGateway } from './games.gateway';
import { ParticipationsService } from 'src/participations/participations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Participation]),
  ],
  controllers: [GamesController],
  providers: [GamesService, GamesGateway, ParticipationsService],
})
export class GamesModule {}
