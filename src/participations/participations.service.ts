import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Participation } from './entities/participation.entity';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

import { Logger } from '@nestjs/common';

const loggerContext = 'ParticipationsService';
@Injectable()
export class ParticipationsService {
  constructor(
    @InjectRepository(Participation)
    private participationsRepository: Repository<Participation>,
  ) {}
  create(createParticipationDto: CreateParticipationDto) {
    try {
      Logger.log(
        `Creating participation, ${JSON.stringify(createParticipationDto)}`,
        loggerContext,
      );
      return this.participationsRepository.save({
        created_at: new Date(),
        ...createParticipationDto,
      });
    } catch (error) {
      console.log('Error creating participation: ', error);
      return error;
    }
  }

  async getParticipationByUserIdAndGameId(gameId: number, userId: number) {
    try {
      Logger.log(
        `Getting participation by user id ${userId}, and game id ${gameId}`,
        loggerContext,
      );
      const x = await this.participationsRepository.findOne({
        where: { user: { id: userId }, game: { id: gameId } },
      });
      Logger.log(`Found participation, ${JSON.stringify(x)}`, loggerContext);
      return x;
    } catch (error) {
      console.log(
        'Error getting participation by user id and game id: ',
        error,
      );
      return error;
    }
  }

  findAll() {
    return `This action returns all participations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participation`;
  }

  update(updateParticipationDto: UpdateParticipationDto) {
    try {
      Logger.log(
        `Updating participation by id, ${JSON.stringify(
          updateParticipationDto,
        )}`,
        loggerContext,
      );

      return this.participationsRepository
        .createQueryBuilder()
        .update('Participation')
        .set({ order: updateParticipationDto.order })
        .where('user_id = :user_id', {
          user_id: updateParticipationDto.user_id,
        })
        .andWhere('game_id = :game_id', {
          game_id: updateParticipationDto.game_id,
        })
        .execute();
    } catch (error) {
      console.log('Error updating participation: ', error);
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} participation`;
  }
}
