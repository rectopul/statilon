import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Render } from '@nestjs/common/decorators';
import { AlphanumericService } from './alphanumeric.service';
import { CreateAlphanumericDto } from './dto/create-alphanumeric.dto';
import { UpdateAlphanumericDto } from './dto/update-alphanumeric.dto';

@Controller('module/alphanumeric')
export class AlphanumericController {
  constructor(private readonly alphanumericService: AlphanumericService) {}

  @Post()
  create(@Body() createAlphanumericDto: CreateAlphanumericDto) {
    return this.alphanumericService.create(createAlphanumericDto);
  }

  @Get()
  findAll() {
    return this.alphanumericService.findAll();
  }

  @Get(':id')
  @Render('pages/alphanumeric')
  findOne(@Param('id') id: string) {
    return this.alphanumericService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlphanumericDto: UpdateAlphanumericDto) {
    return this.alphanumericService.update(+id, updateAlphanumericDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alphanumericService.remove(+id);
  }
}
