import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { DataService } from '@modules/data/service/data.service';
import { CreateDataDto } from '@modules/data/dto/create-data.dto';
import { UpdateDataDto } from '@modules/data/dto/update-data.dto';
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  create(@Body() createUserDto: CreateDataDto) {
    return this.dataService.create(createUserDto);
  }

  @Get(':queryselector')
  async get(
    @Param('queryselector') queryselector: string,
    @Query('search') search: string,
  ) {
    return this.dataService.get({ queryselector, search });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateDataDto) {
    if (!id) {
      throw new BadRequestException(`please provide an id to update`);
    }
    return this.dataService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException(`please provide an id to delete`);
    }

    return this.dataService.delete(id);
  }
}
