import IBaseRepository from '@common/interfaces/base-repository.interface';
import { StatusEnumType } from '@enums/global/global.enum';
import { CreateDataDto } from '@modules/data/dto/create-data.dto';
import { ResponseDataDto } from '@modules/data/dto/response-data.dto';
import { UpdateDataDto } from '@modules/data/dto/update-data.dto';

export interface IDataRepository
  extends IBaseRepository<CreateDataDto, UpdateDataDto, ResponseDataDto> {
  findByStatus(status: StatusEnumType): Promise<ResponseDataDto[]>;
}
