import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmRepository } from 'src/repositories/user.repository';
import { User } from './entities/user.entity';
import { CreateUserUseCase } from './user-cases/create-user.use-case';
import { FindAllUserUseCase } from './user-cases/find-all-user.use-case';
import { FindByIdUserUseCase } from './user-cases/find-by-id-user.use-case';
import { GetProductsUserUseCase } from './user-cases/get-products-user.use-case';
import { RemoveUserUseCase } from './user-cases/remove-user.use-case';
import { SetDeptoUserUseCase } from './user-cases/set-depto-user.use-case';
import { SetRoleUserUseCase } from './user-cases/set-role-user.use.case';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROJECTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'projects_queue',
        },
      },
    ]),
    HttpModule, 
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindAllUserUseCase,
    FindByIdUserUseCase,
    RemoveUserUseCase,
    SetDeptoUserUseCase,
    SetRoleUserUseCase,
    GetProductsUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
})
export class UsersModule {}