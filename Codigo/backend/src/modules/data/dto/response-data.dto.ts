import { IsString } from 'class-validator';
import { CreateDataDto } from './create-data.dto';

export class ResponseDataDto extends CreateDataDto {
  @IsString()
  readonly id: string;
}
