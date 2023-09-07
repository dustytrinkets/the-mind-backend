import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Controller('participations')
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Post()
  create(@Body() createParticipationDto: CreateParticipationDto) {
    return this.participationsService.create(createParticipationDto);
  }
  @Put()
  createParticipation(@Body() updateParticipationDto: UpdateParticipationDto) {
    return this.participationsService.update(updateParticipationDto);
  }

  @Get()
  findAll() {
    return this.participationsService.findAll();
  }

  @Get('/:gameId/:userId')
  getParticipationByUserIdAndGameId(
    @Param('gameId') gameId: number,
    @Param('userId') userId: number,
  ) {
    return this.participationsService.getParticipationByUserIdAndGameId(
      gameId,
      userId,
    );
  }

  @Get(':id')
  findNumbersByGameId(@Param('id') id: string) {
    return this.participationsService.findNumbersByGameId(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participationsService.remove(+id);
  }
}
