import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import UserDto from 'src/dtos/users/UserDto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import UpdateUserDto from '../../dtos/users/UpdateUserDto';
import { CreateUserDto } from '../../dtos/users/CreateUserDto';
import { QueryDto, PaginationResponseDto } from '../../dtos/QueryDto';
// import { SendmailService } from '../../sendmail/sendmail.service';
// import { SendMailDto } from '../../dtos/auth/SendMailDto';



@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    // private readonly sendmailService: SendmailService,
  ) {}

  async findAll(queries: QueryDto): Promise<PaginationResponseDto<UserDto>> {
    if (!!queries.search) {
      return {
        data: await this.prisma.user.findMany({
          where: {
            OR: [
              {
                email: {
                  contains: queries.search,
                },
                firstname: {
                  contains: queries.search,
                },
                phone: {
                  contains: queries.search,
                },
                lastname: {
                  contains: queries.search,
                },
              },
            ],
          },
          select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            phone: true,
            profile: true,
            createdAt: true,
            updatedAt: true,
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
    return {
      data: await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          phone: true,
          profile: true,
          createdAt: true,
          updatedAt: true,
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

  findOne(id: number): Observable<UserDto | null> {
    return from(
      this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          phone: true,
          profile: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    );
  }

  async create(createDto: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createDto.password, salt);
    let user = await this.prisma.user.create({
      data: { ...createDto, password: hash },
      select: { id: true },
    });
    // if (user) {
    //   let sd=new SendMailDto();
    //   sd.content=undefined;
    //   sd.email=createDto.email;
    //   return await this.sendmailService.sendWelcomeEmail(sd);
    // }
    return Promise.resolve(user);
  }

  async update(
    id: number,
    updateDto: UpdateUserDto,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      let user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          profile: true,
        },
      });
      if (file) {
        updateDto.profile = `${file.filename}`;
      } else {
        updateDto.profile = user?.profile!;
      }
    } catch (error) {
      console.error(error);
    }
    return from(this.prisma.user.update({ where: { id }, data: updateDto }));
  }

  async remove(id: number): Promise<{ id: number }> {
    return this.prisma.user.delete({ where: { id }, select: { id: true } });
  }
}
