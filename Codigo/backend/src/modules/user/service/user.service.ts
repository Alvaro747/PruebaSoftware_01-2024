import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { UserPrismaRepository } from '@modules/user/persistence/relational/repository/user-prisma.repository';
import { StatusEnumType } from '@enums/global/global.enum';
import { ResponseUserDto } from '../dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async validateUser(username: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.validateUser(username);
    return user ? user : null;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }

  async get(params: { queryselector: string; search: string }) {
    if (!params?.queryselector) {
      throw new BadRequestException('please provide a query selector');
    }
    let response: ResponseUserDto | ResponseUserDto[];

    switch (params.queryselector) {
      case 'id':
        response = await this.findById(params);
        break;
      case 'username':
        response = await this.findByUsername(params);
        break;
      case 'email':
        response = await this.findByEmail(params);
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

  private async findAll(): Promise<ResponseUserDto[]> {
    return this.userRepository.findAll();
  }

  private async findById(params: { search: string }): Promise<ResponseUserDto> {
    if (!params?.search) {
      throw new BadRequestException(`please provide an id to search`);
    }

    const response = await this.userRepository.findById(params.search);

    if (!response) {
      throw new NotFoundException(`User with id ${params.search} not found`);
    }
    return response;
  }

  private async findByEmail(params: {
    search: string;
  }): Promise<ResponseUserDto> {
    if (!params?.search) {
      throw new BadRequestException(`please provide an email to search`);
    }
    const response = await this.userRepository.findByEmail(params.search);

    if (!response) {
      throw new NotFoundException(`User with email ${params.search} not found`);
    }

    return response;
  }

  private async findByUsername(params: {
    search: string;
  }): Promise<ResponseUserDto> {
    if (!params?.search) {
      throw new BadRequestException(`please provide an authUserId to search`);
    }

    const response = await this.userRepository.findByUsername(params.search);

    if (!response) {
      throw new NotFoundException(
        `User with auth user id ${params.search} not found`,
      );
    }

    return response;
  }

  private async findByStatus(params: {
    search: string;
  }): Promise<ResponseUserDto[]> {
    if (!params?.search) {
      throw new BadRequestException('please provide a status to search');
    }

    const statusCasted: StatusEnumType = params.search as StatusEnumType;
    const response = await this.userRepository.findByStatus(statusCasted);

    return response;
  }
}
