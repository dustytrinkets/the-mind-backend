import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/entities/user.entity';
import { Room } from './rooms/entities/room.entity';
import { RoomUser } from './room-users/entities/room-user.entity';
import { Game } from './games/entities/game.entity';

import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomUsersModule } from './room-users/room-users.module';
import { RoomUsersGateway } from './room-users/room-users.gateway';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Game, User, Room, RoomUser],
      synchronize: process.env.SYNCDB ? true : false,
    }),
    UsersModule,
    RoomsModule,
    RoomUsersModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoomUsersGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
