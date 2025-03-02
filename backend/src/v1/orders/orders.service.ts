import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOrderDto } from '../../dtos/orders/CreateOrderDto';
import { UpdateOrderDto } from '../../dtos/orders/UpdateOrderDto';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { OrderDto } from '../../dtos/orders/OrderDto';
import { Payload } from '../../auth/roles.gaurds';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(queries: QueryDto): Promise<PaginationResponseDto<OrderDto>> {
    if (queries.search) {
      return {
        data: await this.prismaService.order.findMany({
          where: {
            user: {
              OR: [
                {
                  email: {
                    contains: queries.search,
                  },
                },
                {
                  firstname: {
                    contains: queries.search,
                  },
                },
                {
                  lastname: {
                    contains: queries.search,
                  },
                },
              ],
            },
          },
          select: {
            id: true,
            OrderItem: {
              select: {
                quantity: true,
              },
            },
            createdAt: true,
            updatedAt: true,
            status: true,
            totalAmount: true,
            user: {
              select: {
                email: true,
              },
            },
          },
          skip: Number(queries.offset) * Number(queries.limit),
          take: Number(queries.limit),
          orderBy: {
            id: 'asc',
          },
        }),
        total: await this.prismaService.order.count(),
        pageSize: Number(queries.limit),
      };
    }
    return {
      data: await this.prismaService.order.findMany({
        select: {
          id: true,
          OrderItem: {
            select: {
              quantity: true,
            },
          },
          createdAt: true,
          updatedAt: true,
          status: true,
          totalAmount: true,
          user: {
            select: {
              email: true,
            },
          },
        },
        skip: Number(queries.offset) * Number(queries.limit),
        take: Number(queries.limit),
        orderBy: {
          id: 'asc',
        },
      }),
      total: await this.prismaService.order.count(),
      pageSize: Number(queries.limit),
    };
  }

  async findOne(id: number): Promise<OrderDto | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      select: {
        id: true,
        OrderItem: {
          select: {
            quantity: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        status: true,
        totalAmount: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  async create(
    createOrderDto: CreateOrderDto,
    user: Payload,
  ): Promise<{ id: number }> {
    return this.prismaService.order.create({
      data: {
        totalAmount: createOrderDto.items.reduce(
          (acc, value) => (acc += value.price * value.quantity),
          0,
        ),
        user: {
          connect: {
            id: user.sub,
          },
        },
        OrderItem: {
          create: createOrderDto.items.map((items) => ({
            productId: items.productId,
            quantity: items.quantity,
            price: items.price,
          })),
        },
      },
      select: {
        id: true,
      },
    });
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<{ id: number }> {
    return this.prismaService.order.update({
      where: { id },
      data: {
        status: updateOrderDto.status,
      },
      select: {
        id: true,
      },
    });
  }

  delete(id: number): Promise<{ id: number }> {
    return this.prismaService.order.delete({
      where: { id },
      select: {
        id: true,
      },
    });
  }
}
