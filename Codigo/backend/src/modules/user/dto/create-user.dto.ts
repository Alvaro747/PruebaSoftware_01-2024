import {
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  Length,
  IsEmail,
  MinLength,
  ValidateIf,
  Matches,
  MaxLength,
} from 'class-validator';
import { StatusEnum, StatusEnumType } from '@enums/global/global.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  readonly username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @ValidateIf((o) => o.password !== undefined) // Validate only if password is present
  @Matches(/[\W_]/, {
    message: 'Password must contain at least one special character',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @MaxLength(20, { message: 'Maximum password length is 20 characters' })
  password?: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly lastName: string;

  @IsEnum(StatusEnum)
  @IsOptional()
  readonly status?: StatusEnumType;
}
