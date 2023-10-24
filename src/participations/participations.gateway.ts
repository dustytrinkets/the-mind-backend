import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

const loggerContext = 'ParticipationsGateway';

@WebSocketGateway(8001, { cors: '*' })
export class ParticipationsGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('sendnumber')
  handleMessage(@MessageBody() message): void {
    Logger.log(
      `A user sent a number: ${JSON.stringify(message)}`,
      loggerContext,
    );
    this.server.socketsJoin(message.roomCode);
    this.server.to(message.roomCode).emit('sendnumber', {
      numberSent: message.userRandomNumber,
      roomIdSent: message.roomId,
      userIdSent: message.userId,
      userNameSent: message.userName,
    });
  }
}
