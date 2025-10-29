import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateDeptoUserDto } from './dto/update-depto-user.dto';
import { UpdateRoleDto } from './dto/update-role-user.dto';
import { CreateUserUseCase } from './user-cases/create-user.use-case';
import { FindAllUserUseCase } from './user-cases/find-all-user.use-case';
import { FindByIdUserUseCase } from './user-cases/find-by-id-user.use-case';
import { GetProductsUserUseCase } from './user-cases/get-products-user.use-case';
import { RemoveUserUseCase } from './user-cases/remove-user.use-case';
import { SetDeptoUserUseCase } from './user-cases/set-depto-user.use-case';
import { SetRoleUserUseCase } from './user-cases/set-role-user.use.case';

@Controller('users')
export class UsersController {
  @Inject(FindAllUserUseCase)
  private readonly findAllUserUseCase: FindAllUserUseCase;

  @Inject(FindByIdUserUseCase)
  private readonly findByIdUserUseCase: FindByIdUserUseCase;

  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase;

  @Inject(SetDeptoUserUseCase)
  private readonly setDeptoUserUseCase: SetDeptoUserUseCase;

  @Inject(RemoveUserUseCase)
  private readonly removeUserUseCase: RemoveUserUseCase;

  @Inject(SetRoleUserUseCase)
  private readonly setRoleUserUseCase: SetRoleUserUseCase;

  @Inject(GetProductsUserUseCase)
  private readonly getProductsUserUseCase: GetProductsUserUseCase;

  @Get()
  findAll() {
    return this.findAllUserUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdUserUseCase.execute(id);
  }

  @Get('/products/:id')
  async findProductByUser(@Param('id') id: string) {
    return this.getProductsUserUseCase.execute(id);
  }

  @Patch(':id/depto')
  async updateDepto(
    @Param('id') id: string,
    @Body() updateDeptoUserDto: UpdateDeptoUserDto,
  ) {
    return this.setDeptoUserUseCase.execute(id, updateDeptoUserDto);
  }

  @Patch(':id/role')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.setRoleUserUseCase.execute(id, updateRoleDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeUserUseCase.execute(id);
  }
}