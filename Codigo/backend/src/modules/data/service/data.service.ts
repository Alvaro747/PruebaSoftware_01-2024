import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDataDto } from '@modules/data/dto/create-data.dto';
import { UpdateDataDto } from '@modules/data/dto/update-data.dto';
import { DataPrismaRepository } from '@modules/data/persistence/relational/repository/data-prisma.repository';
import { StatusEnumType } from '@enums/global/global.enum';
import { ResponseDataDto } from '../dto/response-data.dto';

@Injectable()
export class DataService {
  constructor(private readonly dataRepository: DataPrismaRepository) {}

  async create(createUserDto: CreateDataDto) {
    return this.dataRepository.create(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateDataDto) {
    return this.dataRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    return this.dataRepository.delete(id);
  }

  async get(params: { queryselector: string; search: string }) {
    if (!params?.queryselector) {
      throw new BadRequestException('please provide a query selector');
    }
    let response: ResponseDataDto | ResponseDataDto[];

    switch (params.queryselector) {
      case 'id':
        response = await this.findById(params);
        break;
      case 'all':
        response = await this.findAll();
        break;
      case 'status':
        response = await this.findByStatus(params);
        break;
      default:
        throw new BadRequestException('provide a valid slug to query');
    }

    return response;
  }

  // FIND METHODS

  private async findAll(): Promise<ResponseDataDto[]> {
    return this.dataRepository.findAll();
  }

  private async findById(params: { search: string }): Promise<ResponseDataDto> {
    if (!params?.search) {
      throw new BadRequestException(`please provide an id to search`);
    }

    const response = await this.dataRepository.findById(params.search);

    if (!response) {
      throw new NotFoundException(`User with id ${params.search} not found`);
    }
    return response;
  }

  private async findByStatus(params: {
    search: string;
  }): Promise<ResponseDataDto[]> {
    if (!params?.search) {
      throw new BadRequestException('please provide a status to search');
    }

    const statusCasted: StatusEnumType = params.search as StatusEnumType;
    const response = await this.dataRepository.findByStatus(statusCasted);

    return response;
  }
}
