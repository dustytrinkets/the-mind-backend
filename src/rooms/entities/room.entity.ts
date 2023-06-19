import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @ManyToOne(() => User, (user: User) => user.id)
  creator: User;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => User, (user: User) => user.rooms)
  users: User[];
}
