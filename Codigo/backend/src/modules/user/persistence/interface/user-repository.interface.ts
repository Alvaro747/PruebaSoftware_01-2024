import IBaseRepository from '@common/interfaces/base-repository.interface';
import { StatusEnumType } from '@enums/global/global.enum';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { ResponseUserDto } from '@modules/user/dto/response-user.dto';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';

export interface IUserRepository
  extends IBaseRepository<CreateUserDto, UpdateUserDto, ResponseUserDto> {
  findByEmail(email: string): Promise<ResponseUserDto | null>;
  validateUser(email: string): Promise<ResponseUserDto>;
  findByUsername(userName: string): Promise<ResponseUserDto | null>;
  findByStatus(status: StatusEnumType): Promise<ResponseUserDto[]>;
}
