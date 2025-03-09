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
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import CreateProductDto from '../../dtos/products/CreateProductDto';
import UpdateProductDto from '../../dtos/products/UpdateProductDto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  JwtAuthGuardGuard,
  Public,
} from '../../auth/jwt-auth.guard/jwt-auth.guard.guard';
import { Role, Roles } from '../../decorators/role.decorator';
import { RolesGuard } from '../../auth/roles.gaurds';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { ProductDto } from '../../dtos/products/ProductDto';
import supabase from '../../supabase';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@UseGuards(JwtAuthGuardGuard, RolesGuard)
@Controller('v1/products')
export class ProductsController {
  constructor(
    private readonly productServices: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Get()
  findAll(
    @Query() pagination: QueryDto,
  ): Promise<PaginationResponseDto<ProductDto>> {
    try {
      return this.productServices.findAll(pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, error);
    }
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProductDto | null> {
    try {
      return this.productServices.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, error);
    }
  }

  @Roles(Role.ADMIN, Role.SUPERUSER)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
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
    @Body() createProductDto: CreateProductDto,
  ): Promise<any> {
    try {
      if (file) {
        const { data, error } = await supabase.storage
          .from('local-balzaar/products')
          .upload(`${uuidv4()}-${file.originalname}`, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
          });
        if (error) {
          console.log(error);
        } else {
          createProductDto.image = file
            ? `${this.configService.get<string>('SUPABASE_PROJET_URL')}/storage/v1/object/public/${data.fullPath}`
            : null;
        }
      }
      return this.productServices.create(createProductDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Roles(Role.ADMIN, Role.SUPERUSER)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{ id: number }> {
    try {
      return this.productServices.update(id, updateProductDto, file);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Roles(Role.ADMIN, Role.SUPERUSER)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ id: number }> {
    try {
      return this.productServices.remove(id);
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
