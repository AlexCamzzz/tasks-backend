// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getDashboardStats() { // Sin ": string" para que TS infiera el objeto JSON
    return this.appService.getDashboardStats();
  }
}