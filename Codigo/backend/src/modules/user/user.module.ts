import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { RelationalUserPersistenceModule } from './persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalUserPersistenceModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
