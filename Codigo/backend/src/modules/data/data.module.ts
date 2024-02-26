import { Module } from '@nestjs/common';
import { DataController } from './controller/data.controller';
import { DataService } from './service/data.service';
import { RelationalUserPersistenceModule } from './persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalUserPersistenceModule],
  controllers: [DataController],
  providers: [DataService],
  exports: [DataService],
})
export class UserModule {}
