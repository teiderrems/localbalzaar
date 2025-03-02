import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateShopDto } from '../../dtos/shops/CreateShopDto';
import { UpdateShopDto } from '../../dtos/shops/UpdateShopDto';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { ShopDto } from '../../dtos/shops/ShopDto';
import { Payload } from 'src/auth/roles.gaurds';

@Injectable()
export class ShopsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(queries: QueryDto): Promise<PaginationResponseDto<ShopDto>> {
    if (queries.search) {
      return {
        data: await this.prismaService.shops.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: queries.search,
                },
              },
              {
                address: {
                  contains: queries.search,
                },
              },
              {
                phone: {
                  contains: queries.search,
                },
              },
            ],
          },
          select: {
            id: true,
            name: true,
            phone: true,
            address: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                email: true,
              },
            },
          },
          take: Number(queries.limit),
          skip: Number(queries.offset) * Number(queries.limit),
          orderBy: {
            id: 'asc',
          },
        }),
        total: await this.prismaService.shops.count(),
        pageSize: Number(queries.limit),
      };
    }
    return {
      data: await this.prismaService.shops.findMany({
        select: {
          id: true,
          name: true,
          phone: true,
          address: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              email: true,
            },
          },
        },
        take: Number(queries.limit),
        skip: Number(queries.offset) * Number(queries.limit),
        orderBy: {
          id: 'asc',
        },
      }),
      total: await this.prismaService.shops.count(),
      pageSize: Number(queries.limit),
    };
  }

  async findOne(id: number): Promise<ShopDto | null> {
    return this.prismaService.shops.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  async create(
    createShopDto: CreateShopDto,
    user: Payload,
  ): Promise<{ id: number }> {
    return this.prismaService.shops.create({
      data: {
        name: createShopDto.name,
        address: createShopDto.address,
        phone: createShopDto.phone,
        user: {
          connect: {
            id: user.sub,
          },
        },
      },
      select: {
        id: true,
      },
    });
  }

  async update(
    id: number,
    updateShopDto: UpdateShopDto,
  ): Promise<{ id: number }> {
    return this.prismaService.shops.update({
      where: { id },
      data: updateShopDto,
      select: {
        id: true,
      },
    });
  }

  async delete(id: number): Promise<{ id: number }> {
    return this.prismaService.shops.delete({
      where: { id },
      select: {
        id: true,
      },
    });
  }
}
