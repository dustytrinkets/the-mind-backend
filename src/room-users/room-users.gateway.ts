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
    Logger.log(`roomuser: ${message}`, loggerContext);
    this.server.emit('roomuser', message);
    // return message;
  }
}
