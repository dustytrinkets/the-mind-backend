import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room: Room) => room.id)
  roomId: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
