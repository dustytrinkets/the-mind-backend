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
    @MessageBody()
    game: {
      roomId: number;
      roomCode: string;
      id: number;
      numbers: number[];
    },
  ): void {
    Logger.log(
      `Game started: Game id: ${game.id}. Numbers: ${game.numbers}`,
      loggerContext,
    );
    this.server.socketsJoin(game.roomCode);
    this.server.to(game.roomCode).emit('startgame', game);
  }
}
