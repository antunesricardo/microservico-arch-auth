import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from 'src/repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class SetRoleUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepo: IUserRepository,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findById(id);

    user.verifyUser(user);
    if (updateUserDto.role) user.updateRole(updateUserDto.role);

    await this.userRepo.update(user);

    return user;
  }
}