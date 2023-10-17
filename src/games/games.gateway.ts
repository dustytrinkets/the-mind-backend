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
    },
  ): void {
    Logger.log(`Game started: Game id: ${game.id}`, loggerContext);
    this.server.socketsJoin(game.roomCode);
    this.server.to(game.roomCode).emit('startgame', {
      roomIdSent: game.roomId,
      roomCodeSent: game.roomCode,
      gameIdSent: game.id,
    });
  }

  @SubscribeMessage('lose')
  handleGameOver(
    @MessageBody()
    game: {
      roomId: number;
      roomCode: string;
      id: number;
    },
  ): void {
    Logger.log(`Game over: Game id: ${game.id}`, loggerContext);
    this.server.socketsJoin(game.roomCode);
    this.server.to(game.roomCode).emit('lose', {
      roomIdSent: game.roomId,
    });
  }

  @SubscribeMessage('win')
  handleGameWin(
    @MessageBody()
    game: {
      roomId: number;
      roomCode: string;
      id: number;
    },
  ): void {
    Logger.log(`Game win: Game id: ${game.id}`, loggerContext);
    this.server.socketsJoin(game.roomCode);
    this.server.to(game.roomCode).emit('win', {
      roomIdSent: game.roomId,
    });
  }

  @SubscribeMessage('backtoroom')
  handleBackToRoom(
    @MessageBody()
    game: {
      roomId: number;
      roomCode: string;
    },
  ): void {
    Logger.log(`Back to room ${game.roomCode}`, loggerContext);
    this.server.socketsJoin(game.roomCode);
    this.server.to(game.roomCode).emit('backtoroom', {
      roomIdSent: game.roomId,
    });
  }

  @SubscribeMessage('playagain')
  handlePlayAgain(
    @MessageBody()
    game: {
      roomId: number;
      roomCode: string;
      newGameId: number;
    },
  ): void {
    Logger.log(`Play again for room ${game.roomCode}`, loggerContext);
    this.server.socketsJoin(game.roomCode);
    this.server.to(game.roomCode).emit('playagain', {
      roomIdSent: game.roomId,
      newGameIdSent: game.newGameId,
    });
  }
}
