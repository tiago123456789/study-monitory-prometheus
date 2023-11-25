import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpRequestInterceptor } from './http-request.interceptor';

@UseInterceptors(HttpRequestInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): number {
    return this.appService.getHello();
  }
}
