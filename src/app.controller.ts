import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @HttpCode(HttpStatus.OK)
  @Get()
  appWorking(): string {
    return 'App running!';
  }
}
