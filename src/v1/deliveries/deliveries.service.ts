import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdateDeliveryDto } from '../../dtos/deliveries/UpdateDeliveryDto';
import { CreateDeliveryDto } from '../../dtos/deliveries/CreateDeliveryDto';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { DeliveryDto } from '../../dtos/deliveries/DeliveryDto';

@Injectable()
export class DeliveriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    queries: QueryDto,
  ): Promise<PaginationResponseDto<DeliveryDto>> {
    return {
      data: await this.prismaService.delivery.findMany({
        select: {
          id: true,
          status: true,
          deliveryAddress: true,
          deliveryDate: true,
        },
        take: Number(queries.limit),
        skip: Number(queries.limit) * Number(queries.offset),
      }),
      total: await this.prismaService.delivery.count(),
      pageSize: Number(queries.limit),
    };
  }

  async findOne(id: number): Promise<DeliveryDto | null> {
    return this.prismaService.delivery.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        deliveryAddress: true,
        deliveryDate: true,
      },
    });
  }

  async create(dto: CreateDeliveryDto): Promise<{ id: number }> {
    return this.prismaService.delivery.create({
      data: dto,
      select: {
        id: true,
      },
    });
  }

  update(
    id: number,
    deliveryUpdateDto: UpdateDeliveryDto,
  ): Promise<{ id: number }> {
    return this.prismaService.delivery.update({
      where: { id },
      data: deliveryUpdateDto,
      select: {
        id: true,
      },
    });
  }

  async delete(id: number): Promise<{ id: number }> {
    return this.prismaService.delivery.delete({
      where: { id },
      select: {
        id: true,
      },
    });
  }
}
