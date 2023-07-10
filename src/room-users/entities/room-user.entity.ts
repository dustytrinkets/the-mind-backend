import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class RoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rooms, { eager: true })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User[];

  @ManyToOne(() => Room, (room) => room.users, { eager: true })
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
  room: Room[];

  @CreateDateColumn()
  created_at: Date;
}
