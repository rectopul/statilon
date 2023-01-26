import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService){}

  create(createDocumentDto: CreateDocumentDto) {
    return 'This action adds a new document';
  }

  findAll() {
    return `This action returns all documents`;
  }

  async findOne(id: number) {
    try {
      const client = await this.prisma.client.findFirst({ where: { id }})

      return {
        msg: `This action returns a #${id} document`,
        pageType: `safety`,
        formType: `documents`,
        client,
        pageClasses: `unicred safety`,
        title: `Unicred - Internet Banking`
      };
    } catch (error) {
      console.log(error)
    }
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
