import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class RoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rooms)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User[];

  @Column()
  user_id: number;

  @ManyToOne(() => Room, (room) => room.users)
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
  room: Room[];

  @Column()
  room_id: number;

  @CreateDateColumn()
  created_at: Date;
}
