import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto from '../../dtos/users/UserDto';
import UpdateUserDto from '../../dtos/users/UpdateUserDto';
import { CreateUserDto } from '../../dtos/users/CreateUserDto';
import {
  JwtAuthGuardGuard,
  Public,
} from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';
import { Role, Roles } from '../../decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '../../auth/roles.gaurds';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import supabase from '../../supabase';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@UseGuards(JwtAuthGuardGuard, RolesGuard)
@Controller('v1/users')
export class UsersController {
  constructor(
    private readonly usersServices: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUPERUSER)
  async findAll(
    @Query() pagination: QueryDto,
  ): Promise<PaginationResponseDto<UserDto>> {
    try {
      return await this.usersServices.findAll(pagination);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND, error);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto | null> {
    try {
      return this.usersServices.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND, error);
    }
  }

  @Public()
  @UseInterceptors(FileInterceptor('profile'))
  @Post()
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto
  ): Promise<boolean> {
    try {
      if (file) {
        const { data, error } = await supabase.storage
          .from(
            `${this.configService.get<string>('SUPABASE_BUCLET_NAME')!}/profiles`,
          )
          .upload(`${uuidv4()}-${file.originalname}`, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
          });
        if (error) {
          console.log(error);
        } else {
          createUserDto.profile = file
            ? `${this.configService.get<string>('SUPABASE_PROJET_URL')}/storage/v1/object/public/${data.fullPath}`
            : undefined;
        }
      }
      return await this.usersServices.create(createUserDto,this.configService.get<string>('BASE_URL')!);
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
  async update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    try {
      return this.usersServices.update(id, updateUserDto, file);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ id: number }> {
    try {
      return this.usersServices.remove(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
