import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway(8001, { cors: '*' })
export class RoomsGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('roomuser')
  handleMessage(@MessageBody() roomuser: string): void {
    console.log(roomuser);
    this.server.emit('roomuser', roomuser);
  }
}
