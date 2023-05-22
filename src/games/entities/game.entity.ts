import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

export enum GameStatus {
  ACTIVE = 'ACTIVE',
  WIN = 'win',
  LOSE = 'lose',
}

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.id)
  room_id: number;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.ACTIVE,
  })
  status: GameStatus;

  @Column()
  created_at: Date;
}
