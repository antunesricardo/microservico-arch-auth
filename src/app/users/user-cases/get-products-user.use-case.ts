import { Inject, Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import type { IUserRepository } from 'src/repositories/user.repository';

@Injectable()
export class GetProductsUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepo: IUserRepository,
    private http: HttpService,
  ) {}

  async execute(id: string) {
    const { data } = await this.http.axiosRef.get(
      `http://localhost:3001/projects/byuserid/${id}`,
    );
    return data;
  }
}