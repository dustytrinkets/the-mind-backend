import { PartialType } from '@nestjs/mapped-types';
import { CreateParticipationDto } from './create-participation.dto';

export class UpdateParticipationDto extends PartialType(
  CreateParticipationDto,
) {
  user_id: number;
  game_id: number;
  order: number;
}
