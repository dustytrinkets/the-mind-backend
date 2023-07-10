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
  handleMessage(@MessageBody() message: string): void {
    Logger.log(`A user entered: ${message}`, loggerContext);
    this.server.emit('roomuser', message);
  }
  // @SubscribeMessage('user_leave')
  // handleUserLeave(@MessageBody() message: string, client): void {
  //   Logger.log(`user_leave id: ${message}`, loggerContext);
  //   this.server.emit('user_leave', message);
  // }
}
