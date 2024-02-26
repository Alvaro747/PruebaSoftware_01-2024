import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@modules/database/database.service';
import { IDataRepository } from '@modules/data/persistence/interface/data-repository.interface';
import { CreateDataDto } from '@modules/data/dto/create-data.dto';
import { UpdateDataDto } from '@modules/data/dto/update-data.dto';
import { StatusEnum, StatusEnumType } from '@enums/global/global.enum';
import { ResponseDataDto } from '@modules/data/dto/response-data.dto';

@Injectable()
export class DataPrismaRepository implements IDataRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(entity: CreateDataDto): Promise<CreateDataDto> {
    return this.databaseService.data.create({
      data: entity,
    });
  }

  async update(
    id: string,
    updatedEntity: Partial<UpdateDataDto>,
  ): Promise<UpdateDataDto | null> {
    return this.databaseService.data.update({
      where: {
        id,
      },
      data: updatedEntity,
    });
  }

  async delete(id: string): Promise<UpdateDataDto> {
    return this.databaseService.data.update({
      where: { id: id },
      data: { status: StatusEnum.DELETED },
    });
  }

  // FIND METHODS

  async findAll(): Promise<ResponseDataDto[]> {
    return this.databaseService.data.findMany({
      where: {
        status: {
          not: StatusEnum.DELETED,
        },
      },
      select: this.selectDefaultFields(),
    });
  }

  async findById(id: string): Promise<ResponseDataDto | null> {
    return this.databaseService.data.findUnique({
      where: {
        id,
      },
      select: this.selectDefaultFields(),
    });
  }

  async findByStatus(status: StatusEnumType): Promise<ResponseDataDto[]> {
    return this.databaseService.data.findMany({
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
      date: true,
      value: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    };
  }
}
