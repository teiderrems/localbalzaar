import { Injectable } from '@nestjs/common';
import UserDto from '../../dtos/users/UserDto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import UpdateUserDto from '../../dtos/users/UpdateUserDto';
import { CreateUserDto } from '../../dtos/users/CreateUserDto';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../../dtos/users/UserCreatedEvent';
import { ConfigService } from '@nestjs/config';
import supabase from '../../supabase';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {}

  async findAll(queries: QueryDto): Promise<PaginationResponseDto<UserDto>> {
    if (queries.search) {
      return {
        data: await this.prisma.user.findMany({
          where: {
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
                phone: {
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
          omit: { password: true },
          include: {
            userRole: {
              select: {
                role: {
                  select: { name: true },
                },
              },
            },
          },
          skip: Number(queries.offset) * Number(queries.limit),
          take: Number(queries.limit),
          orderBy: {
            id: 'asc',
            firstname: 'desc',
          },
        }),
        total: await this.prisma.user.count(),
        pageSize: Number(queries.limit),
      };
    }
    return {
      data: await this.prisma.user.findMany({
        omit: { password: true },
        include: {
          userRole: {
            select: {
              role: {
                select: { name: true },
              },
            },
          },
        },
        skip: Number(queries.offset) * Number(queries.limit),
        take: Number(queries.limit),
        orderBy: {
          id: 'asc',
        },
      }),
      total: await this.prisma.user.count(),
      pageSize: Number(queries.limit),
    };
  }

  findOne(id: number): Promise<UserDto | null> {
    return this.prisma.user.findUnique({
        where: { id },
        omit: { password: true },
        include: {
          userRole: {
            select: {
              role: {
                select: { name: true },
              },
            },
          },
        },
      });
  }

  async create(createDto: CreateUserDto): Promise<boolean> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createDto.password, salt);
    const user = await this.prisma.user.create({
      data: { ...createDto, password: hash },
      select: { id: true, email: true },
    });
    return Promise.resolve(
      this.eventEmitter.emit('user.created', new UserCreatedEvent(user.email)),
    );
  }

  async update(
    id: number,
    updateDto: UpdateUserDto,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          profile: true,
        },
      });
      if (file) {
        if (user && user?.profile && user?.profile.includes('supabase')) {
          const path=user!.profile.split('//')[1].split('/')[user!.profile.split('//')[1].split('/').length-1];
          await supabase.storage.from(this.configService.get<string>('SUPABASE_BUCLET_NAME')!+'/profiles').remove([path])
        }
        const { data, error } = await supabase.storage
          .from(this.configService.get<string>('SUPABASE_BUCLET_NAME')!+'/profiles')
          .upload(`${uuidv4()}-${file.originalname}`, file.buffer, {
            cacheControl: '3600',
            upsert: true,
            contentType: file.mimetype,
          });
        updateDto.profile = data?`${this.configService.get<string>('SUPABASE_PROJET_URL')}/storage/v1/object/public/${data.fullPath}`:user?.profile;
      }
    } catch (error) {
      console.error(error);
    }
    if (updateDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateDto.password = await bcrypt.hash(updateDto.password, salt);
    }
    const user = await this.prisma.user.update({
      where: { id },
      data: updateDto,
      select: { email: true },
    });

    return this.eventEmitter.emit(
      'user.updated',
      new UserCreatedEvent(user.email),
    );
  }

  async remove(id: number): Promise<{ id: number }> {
    return this.prisma.user.delete({ where: { id }, select: { id: true } });
  }
}
