import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePaymentDto } from '../../dtos/payments/CreatePaymentDto';
import { UpdatePaymentDto } from '../../dtos/payments/UpdatePaymentDto';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { PaymentDto } from '../../dtos/payments/PaymentDto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(queries: QueryDto): Promise<PaginationResponseDto<PaymentDto>> {
    if (queries.search) {
      return {
        data: await this.prismaService.payment.findMany({
          where: {
            order: {
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
          },
          select: {
            id: true,
            status: true,
            createdAt: true,
            amount: true,
            method: true,
            order: {
              select: {
                id: true,
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
          orderBy: {
            id: 'asc',
          },
          take: Number(queries.limit),
          skip: Number(queries.offset) * Number(queries.limit),
        }),
        total: await this.prismaService.payment.count(),
        pageSize: Number(queries.limit),
      };
    }
    return {
      data: await this.prismaService.payment.findMany({
        select: {
          id: true,
          status: true,
          createdAt: true,
          amount: true,
          method: true,
          order: {
            select: {
              id: true,
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
        take: Number(queries.limit),
        skip: Number(queries.offset) * Number(queries.limit),
      }),
      total: await this.prismaService.payment.count(),
      pageSize: Number(queries.limit),
    };
  }

  async findOne(id: number): Promise<PaymentDto | null> {
    return this.prismaService.payment.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        createdAt: true,
        amount: true,
        method: true,
        order: {
          select: {
            id: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<{ id: number }> {
    return this.prismaService.payment.create({
      data: {
        amount: createPaymentDto.amount,
        method: createPaymentDto.method,
        order: {
          connect: { id: createPaymentDto.orderId },
        },
      },
    });
  }

  update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<{ id: number }> {
    return this.prismaService.payment.update({
      where: { id },
      data: updatePaymentDto,
      select: {
        id: true,
      },
    });
  }

  delete(id: number): Promise<{ id: number }> {
    return this.prismaService.payment.delete({
      where: { id },
      select: {
        id: true,
      },
    });
  }
}
