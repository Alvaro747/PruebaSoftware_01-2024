import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { DataModule } from '@modules/data/data.module';

@Module({
  imports: [UserModule, AuthModule, DataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
