import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  MaxLength,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
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
  password: string;
}
