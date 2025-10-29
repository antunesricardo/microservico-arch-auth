import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { Repository } from 'typeorm';

export interface IUserRepository {
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  remove(id: string): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
}

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepo: Repository<User>,
  ) {}

  async create(user: User): Promise<void> {
    await this.typeOrmRepo.save(user);
  }

  async update(user: User): Promise<void> {
    await this.typeOrmRepo.update(user.id, user);
  }

  async remove(id: string): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }

  findAll(): Promise<User[]> {
    return this.typeOrmRepo.find();
  }

  findById(id: string): Promise<User> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
}