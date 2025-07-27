import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; // 👈 ici

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { fullName, email, password, role } = body;
    if (!fullName || !email || !password) {
      throw new BadRequestException('Tous les champs sont requis');
    }
    return await this.authService.register(fullName, email, password, role);
  }

   @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    if (!email || !password) {
      throw new UnauthorizedException('Email et mot de passe requis');
    }
    return await this.authService.login(email, password);
  }
}
