import { Module } from '@nestjs/common';
import { UserPrismaRepository } from './repository/user-prisma.repository';
import { DatabaseModule } from '@modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserPrismaRepository],
  exports: [UserPrismaRepository],
})
export class RelationalUserPersistenceModule {}
