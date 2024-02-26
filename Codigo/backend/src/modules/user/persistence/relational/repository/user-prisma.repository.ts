import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@modules/database/database.service';
import { IUserRepository } from '@modules/user/persistence/interface/user-repository.interface';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { StatusEnum, StatusEnumType } from '@enums/global/global.enum';
import { ResponseUserDto } from '@modules/user/dto/response-user.dto';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(entity: CreateUserDto): Promise<CreateUserDto> {
    return this.databaseService.user.create({
      data: entity,
    });
  }

  async validateUser(username: string): Promise<ResponseUserDto> {
    const user = await this.databaseService.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async update(
    id: string,
    updatedEntity: Partial<UpdateUserDto>,
  ): Promise<UpdateUserDto | null> {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updatedEntity,
    });
  }

  async delete(id: string): Promise<UpdateUserDto> {
    return this.databaseService.user.update({
      where: { id: id },
      data: { status: StatusEnum.DELETED },
    });
  }

  // FIND METHODS

  async findAll(): Promise<ResponseUserDto[]> {
    return this.databaseService.user.findMany({
      where: {
        status: {
          not: StatusEnum.DELETED,
        },
      },
      select: this.selectDefaultFields(),
    });
  }

  async findById(id: string): Promise<ResponseUserDto | null> {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
      select: this.selectDefaultFields(),
    });
  }

  async findByEmail(email: string): Promise<ResponseUserDto | null> {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
      select: this.selectDefaultFields(),
    });
  }

  async findByUsername(username: string): Promise<ResponseUserDto | null> {
    return this.databaseService.user.findUnique({
      where: {
        username,
      },
      select: this.selectDefaultFields(),
    });
  }

  async findByStatus(status: StatusEnumType): Promise<ResponseUserDto[]> {
    return this.databaseService.user.findMany({
      where: {
        status,
      },
      select: this.selectDefaultFields(),
    });
  }

  // Private function to select default fields
  private selectDefaultFields() {
    return {
      id: true,
      email: true,
      username: true,
      name: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    };
  }
}
