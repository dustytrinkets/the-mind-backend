import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/entities/user.entity';
import { Room } from './rooms/entities/room.entity';
import { RoomUser } from './room-users/entities/room-user.entity';

import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomUsersModule } from './room-users/room-users.module';
import { RoomsGateway } from './rooms/rooms.gateway';
import { RoomUsersGateway } from './room-users/room-users.gateway';

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
      entities: [User, Room, RoomUser],
      synchronize: process.env.SYNCDB ? true : false,
    }),
    UsersModule,
    RoomsModule,
    RoomUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoomsGateway, RoomUsersGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
