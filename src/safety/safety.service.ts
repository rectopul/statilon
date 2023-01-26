import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSafetyDto } from './dto/create-safety.dto';
import { UpdateSafetyDto } from './dto/update-safety.dto';

@Injectable()
export class SafetyService {
  constructor(private prisma: PrismaService){}

  create(createSafetyDto: CreateSafetyDto) {
    return 'This action adds a new safety';
  }

  findAll() {
    return `This action returns all safety`;
  }

  async findOne(id: number) {
    try {
      const client = await this.prisma.client.findFirst({ where: {id}})

      console.log(`cliente: `, client)
      return {
        message: `This action returns a #${id} safety`,
        pageType: `safety`,
        client,
        pageClasses: `unicred safety`,
        title: `Unicred - Internet Banking`
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  update(id: number, updateSafetyDto: UpdateSafetyDto) {
    return `This action updates a #${id} safety`;
  }

  remove(id: number) {
    return `This action removes a #${id} safety`;
  }
}
