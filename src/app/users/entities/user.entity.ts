import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum RoleUser {
  Admin = 'administrador',
  User = 'usuário',
}

// Para departamento o correto é usar uma tabela de departamento
// mas para fins de testes vamos utilizar de forma mais simples como enum
export enum DeptoUser {
  SD = 'Sem Departamento',
  TI = 'Tecnologia',
  MKT = 'Marketing',
  FI = 'Financeiro',
  RH = 'Recursos Humanos',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  socialnetwork: string;

  @Column({ type: 'enum', enum: RoleUser, default: RoleUser.User })
  role: RoleUser;

  @Column({ type: 'enum', enum: DeptoUser, default: DeptoUser.SD })
  depto: DeptoUser;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  constructor(
    props?: {
      name: string;
      email: string;
      password: string;
      phone?: string | null;
      socialnetwork?: string | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }

  async createHashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, salt);
  }

  verifyUser(user: User): void {
    if (!user) {
      throw new NotFoundException(`O usuario não foi encontrado!`);
    }
  }

  updateDepto(depto: DeptoUser): void {
    // Verifica se o valor existe no enum
    if (!Object.values(DeptoUser).includes(depto)) {
      throw new BadRequestException(
        `Departamento inválido. Valores permitidos: ${Object.values(DeptoUser).join(', ')}`,
      );
    }

    this.depto = depto;
  }

  updateRole(role: RoleUser): void {
    if (!Object.values(RoleUser).includes(role)) {
      throw new BadRequestException(
        `Role inválida. Valores permitidos: ${Object.values(RoleUser).join(', ')}`,
      );
    }

    if (this.role === RoleUser.User) {
      throw new BadRequestException('Você não tem permissão para alterar!');
    }

    this.role = role;
  }
}