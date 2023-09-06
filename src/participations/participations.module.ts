import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParticipationsService } from './participations.service';
import { ParticipationsController } from './participations.controller';
import { Participation } from './entities/participation.entity';
import { ParticipationsGateway } from './participations.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Participation])],
  controllers: [ParticipationsController],
  providers: [ParticipationsService, ParticipationsGateway],
  exports: [ParticipationsService],
})
export class ParticipationsModule {}
