import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { SafetyService } from './safety.service';
import { CreateSafetyDto } from './dto/create-safety.dto';
import { UpdateSafetyDto } from './dto/update-safety.dto';

@Controller('module/safety')
export class SafetyController {
  constructor(private readonly safetyService: SafetyService) {}

  @Post()
  create(@Body() createSafetyDto: CreateSafetyDto) {
    return this.safetyService.create(createSafetyDto);
  }

  @Get()
  findAll() {
    return this.safetyService.findAll();
  }

  @Get(':id')
  @Render('pages/safety')
  async findOne(@Param('id') id: string) {
    return await this.safetyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSafetyDto: UpdateSafetyDto) {
    return this.safetyService.update(+id, updateSafetyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.safetyService.remove(+id);
  }
}
