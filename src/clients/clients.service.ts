import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AppGateway } from 'src/app/app.gateway';
import { Client } from '@prisma/client'

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService, private socket: AppGateway){}

  async create(data: CreateClientDto): Promise<Client> {
    try {
      data.status = `criado`
      const client = await this.prisma.client.create({data})

      this.socket.server.emit('msgToClient', client)
      this.socket.server.emit('clientSubmit', client)

      return client
    } catch (error) {
      console.log(error)
      throw new Error(error?.message)
    }
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      updateClientDto.status = 'Enviou senha eletrônica'

      await this.prisma.client.update({ where: { id }, data: updateClientDto })

      const client = await this.prisma.client.findFirst({ where: { id }})

      this.socket.server.emit('updateClient', client)

      return client
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
