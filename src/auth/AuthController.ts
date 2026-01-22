// src/auth/auth.controller.ts
import {Controller, Post, Body, UseGuards, Get} from '@nestjs/common';
import { AuthService } from './AuthService';
import { RegisterDto } from './dto/RegisterDto';
import { LoginDto } from './dto/LoginDto';
import {JwtAuthGuard} from "../common/guards/JwtAuthGuard";
import {User} from "../common/decorators/userDecorator";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user) {
    // Devuelve el usuario que el JwtStrategy adjuntó a la request
    return user;
  }
}