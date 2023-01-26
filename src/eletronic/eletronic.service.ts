import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEletronicDto } from './dto/create-eletronic.dto';
import { UpdateEletronicDto } from './dto/update-eletronic.dto';

@Injectable()
export class EletronicService {
  constructor(private readonly prisma: PrismaService){}


  async create(createEletronicDto: CreateEletronicDto) {
    
  }

  findAll() {
    return `This action returns all eletronic`;
  }

  async findOne(id: number): Promise<any> {
    try {
      const client = await this.prisma.client.findFirst({where: { id }})
      return {
        msg: `This action returns a #${id} document`,
        pageType: `safety`,
        formType: `eletronic`,
        client,
        pageClasses: `unicred safety`,
        title: `Unicred - Internet Banking`,
        keyType: `all`
      }
    } catch (error) {
      
    }
  }

  update(id: number, updateEletronicDto: UpdateEletronicDto) {
    return `This action updates a #${id} eletronic`;
  }

  remove(id: number) {
    return `This action removes a #${id} eletronic`;
  }
}
