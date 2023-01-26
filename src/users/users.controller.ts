import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { UserImageService } from '../user_image/user_image.service';
import { Express } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private userImageService: UserImageService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);

    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Patch('image')
  async image(
    @UploadedFile() file: Express.Multer.File, 
    @Req() req
  ) {
    try {
      const { token } = req.cookies

      if(!token) throw new HttpException(`No token provided`, HttpStatus.BAD_REQUEST)

      return await this.userImageService.create(file, token);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
      
  }

  @UseInterceptors(FileInterceptor('file', multerOptions))
  @Patch('image/update')
  async imageUpdate(
    @UploadedFile() file: Express.Multer.File, 
    @Req() req
  ) {
    try {
      const { token } = req.cookies

      if(!token) throw new HttpException(`No token provided`, HttpStatus.BAD_REQUEST)

      return await this.userImageService.update(file, token);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
      
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
