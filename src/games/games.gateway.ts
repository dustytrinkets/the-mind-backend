import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

const loggerContext = 'GamesGateway';

@WebSocketGateway(8001, { cors: '*' })
export class GamesGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('startgame')
  handleMessage(
    @MessageBody() game: { roomCode; id: number; numbers: number[] },
  ): void {
    Logger.log(`Game started: ${game.id} ${game.numbers}`, loggerContext);
    this.server.to(game.roomCode).emit('startgame', game);
  }
}
