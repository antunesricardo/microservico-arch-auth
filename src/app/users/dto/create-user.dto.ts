import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';
import { DeptoUser, RoleUser } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

  @IsOptional()
  @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
  phone: string | null;

  @IsOptional()
  @IsUrl()
  socialnetwork: string | null;

  @IsOptional()
  @IsEnum(RoleUser)
  role: RoleUser;

  @IsOptional()
  @IsEnum(DeptoUser)
  depto: DeptoUser;
}