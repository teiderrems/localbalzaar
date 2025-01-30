import {
  Body,
  Controller,
  Delete, FileTypeValidator,
  Get,
  HttpException,
  HttpStatus, MaxFileSizeValidator,
  Param, ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post, Query, UploadedFile,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import UserDto from 'src/dtos/users/UserDto';
import UpdateUserDto from 'src/dtos/users/UpdateUserDto';
import { CreateUserDto } from '../../dtos/users/CreateUserDto';
import {
  JwtAuthGuardGuard,
  Public,
} from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';
import { Role, Roles } from '../../decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '../../auth/roles.gaurds';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuardGuard,RolesGuard)
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN,Role.SUPERUSER)
  async findAll(@Query() pagination:QueryDto): Promise<PaginationResponseDto<UserDto>> {
    try {
        return await this.usersServices.findAll(pagination);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.meaning, HttpStatus.NOT_FOUND, error);
    }
  }


  @ApiBasicAuth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Observable<UserDto | null> {
    try {
      return this.usersServices.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.meaning, HttpStatus.NOT_FOUND, error);
    }
  }

  @Public()
  @UseInterceptors(FileInterceptor('profile'))
  @Post()
  create(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 10000000 }),
      new FileTypeValidator({ fileType: 'image/*' }),
    ],
    fileIsRequired:false
  }),) file:Express.Multer.File,@Body() createUserDto: CreateUserDto): Promise<{id:number}> {
    try {
      createUserDto.profile = file ? `${file.filename}` : undefined;
      console.log(createUserDto);
      return this.usersServices.create(createUserDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }


  @UseInterceptors(FileInterceptor('profile'))
  @Patch(':id')
  update(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 10000 }),
      new FileTypeValidator({ fileType: 'image/*' }),
    ],
    fileIsRequired:false
  })) file:Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    try {
      return this.usersServices.update(id, updateUserDto,file);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.meaning,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{id:number}> {
    try {
      return this.usersServices.remove(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.meaning,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
