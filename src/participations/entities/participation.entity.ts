import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Game } from '../../games/entities/game.entity';

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User[];

  @ManyToOne(() => Game, (game) => game.id, { eager: true })
  @JoinColumn([{ name: 'game_id', referencedColumnName: 'id' }])
  game: Game[];

  @CreateDateColumn()
  created_at: Date;

  @Column()
  number: number;

  @Column()
  order: number;
}
