import { Module } from '@nestjs/common';
import { DataPrismaRepository } from './repository/data-prisma.repository';
import { DatabaseModule } from '@modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DataPrismaRepository],
  exports: [DataPrismaRepository],
})
export class RelationalUserPersistenceModule {}
