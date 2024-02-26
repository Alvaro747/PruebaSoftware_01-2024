import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends CreateUserDto {
  @IsString()
  readonly id: string;
}
