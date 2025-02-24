import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import UpdateProductDto from '../../dtos/products/UpdateProductDto';
import CreateProductDto from '../../dtos/products/CreateProductDto';
import { ProductDto } from '../../dtos/products/ProductDto';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(queries: QueryDto): Promise<PaginationResponseDto<ProductDto>> {
    if (queries.search) {
      console.log(queries);
      return {
        data: await this.prismaService.product.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: queries.search,
                },
              },
              {
                description: {
                  contains: queries.search,
                },
              },
              {
                shop: {
                  name: {
                    contains: queries.search,
                  },
                },
              },
            ],
          },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            quantity: true,
            isAvailable: true,
            createdAt: true,
            updatedAt: true,
            image: true,
            shop: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          skip: Number(queries.offset) * Number(queries.limit),
          take: Number(queries.limit),
          orderBy: {
            id: 'asc',
          },
        }),
        total: await this.prismaService.product.count(),
        pageSize: Number(queries.limit),
      };
    }
    return {
      data: await this.prismaService.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          quantity: true,
          isAvailable: true,
          createdAt: true,
          updatedAt: true,
          image: true,
          shop: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        skip: Number(queries.offset) * Number(queries.limit),
        take: Number(queries.limit),
        orderBy: {
          id: 'asc',
        },
      }),
      total: await this.prismaService.product.count(),
      pageSize: Number(queries.limit),
    };
  }

  async findOne(id: number): Promise<ProductDto | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
        isAvailable: true,
        createdAt: true,
        updatedAt: true,
        image: true,
        shop: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(createProductDto: CreateProductDto): Promise<any> {
    return this.prismaService.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        quantity: createProductDto.quantity,
        price: createProductDto.price,
        image: createProductDto.image ?? null,
        shop: { connect: { id: createProductDto.shopId } },
        ProductCategory: {
          create: createProductDto.categories.map((id) => ({ categoryId: id })),
        },
      },
    });
  }

  async update(
    id: number,
    updateDto: UpdateProductDto,
    file: Express.Multer.File,
  ): Promise<{ id: number }> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: {
        image: true,
      },
    });
    if (file) {
      updateDto.image = `${file.filename}`;
    } else {
      updateDto.image = product?.image!;
    }
    return this.prismaService.product.update({
      where: { id },
      data: updateDto,
      select: { id: true },
    });
  }

  remove(id: number): Promise<{ id: number }> {
    return this.prismaService.product.delete({ where: { id } });
  }
}
