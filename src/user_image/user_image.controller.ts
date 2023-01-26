import { 
  Controller, 
  Get, 
  Post, 
  Req,
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseInterceptors, 
  UploadedFile, 
  Headers, 
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { UserImageService } from './user_image.service';
import { UpdateUserImageDto } from './dto/update-user_image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Controller('user-image')
export class UserImageController {
  constructor(private readonly userImageService: UserImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @UploadedFile() file: Express.Multer.File, 
    @Headers() headers: any,
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

  @Get()
  findAll() {
    return this.userImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userImageService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(
    @Param('id') id: string, 
    @UploadedFile() file: Express.Multer.File, 
    @Headers() headers: any,
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
    return this.userImageService.remove(+id);
  }
}
