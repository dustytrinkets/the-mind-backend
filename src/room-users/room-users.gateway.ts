import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

const loggerContext = 'RoomUsersGateway';

@WebSocketGateway(8001, { cors: '*' })
export class RoomUsersGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('roomuser')
  handleMessage(@MessageBody() message): void {
    Logger.log(`A user entered: ${message.name}`, loggerContext);
    this.server.socketsJoin(message.roomCode);
    this.server.to(message.roomCode).emit('roomuser', message);
  }
  // @SubscribeMessage('user_leave')
  // handleUserLeave(@MessageBody() message): void {
  //   Logger.log(`user_leave id: ${message}`, loggerContext);
  //   this.server.to(message.roomCode).emit('user_leave', message);
  // }
}
