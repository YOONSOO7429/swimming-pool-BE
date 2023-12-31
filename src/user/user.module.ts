import { Module } from '@nestjs/common';
import { UserController } from '@src/user/user.controller';
import { UserService } from '@src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/user/entities/user.entity';
import { UserRepository } from '@src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
