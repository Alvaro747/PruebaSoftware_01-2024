import {
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { StatusEnum, StatusEnumType } from '@enums/global/global.enum';

export class CreateDataDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  readonly date: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  readonly value: string;

  @IsEnum(StatusEnum)
  @IsOptional()
  readonly status?: StatusEnumType;
}
