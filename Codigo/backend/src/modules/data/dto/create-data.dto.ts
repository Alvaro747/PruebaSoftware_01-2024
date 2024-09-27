import {
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  Length,
  IsNumber,
} from 'class-validator';
import { StatusEnum, StatusEnumType } from '@enums/global/global.enum';

export class CreateDataDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  readonly date: string;

  @IsNumber()
  @IsNotEmpty()
  readonly value: number;

  @IsEnum(StatusEnum)
  @IsOptional()
  readonly status?: StatusEnumType;
}
