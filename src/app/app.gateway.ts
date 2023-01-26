import { 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer 
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  private logger: Logger = new Logger('AppGateway')

  @SubscribeMessage('msgToServer')
  handleMessage(client: any, payload: any): void {
    this.logger.log(`Mensagem recebida: ${JSON.stringify(payload)}`)
    this.server.emit('msgToClient', payload)
  }

  afterInit(server: Server) {
    this.logger.log('Init')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }
}
