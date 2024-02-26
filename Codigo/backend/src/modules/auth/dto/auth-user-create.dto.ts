import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { Type } from 'class-transformer';

export class AuthUserCreateDto {
  @Type(() => CreateUserDto)
  @IsNotEmpty()
  userData: CreateUserDto;
}
