import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { EletronicService } from './eletronic.service';
import { CreateEletronicDto } from './dto/create-eletronic.dto';
import { UpdateEletronicDto } from './dto/update-eletronic.dto';

@Controller('module/eletronic')
export class EletronicController {
  constructor(private readonly eletronicService: EletronicService) {}

  @Post()
  create(@Body() createEletronicDto: CreateEletronicDto) {
    return this.eletronicService.create(createEletronicDto);
  }

  @Get()
  findAll() {
    return this.eletronicService.findAll();
  }

  @Get(':id')
  @Render('pages/eletronicSignature')
  async findOne(@Param('id') id: string) {
    return await this.eletronicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEletronicDto: UpdateEletronicDto) {
    return this.eletronicService.update(+id, updateEletronicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eletronicService.remove(+id);
  }
}
