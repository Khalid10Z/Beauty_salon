import { IsEmail, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsIn(['client', 'salon', 'admin'])
  role?: string;
}
