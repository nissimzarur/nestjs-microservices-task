import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Controller } from '@nestjs/common';
import { ICreateTimer, ISendMessage } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('timers.sendMessage')
  async sendMessage(data: ISendMessage) {
    return this.appService.sendMessage(data);
  }

  @MessagePattern({ cmd: 'timers.create' })
  async create(data: ICreateTimer) {
    return this.appService.create(data);
  }

  @MessagePattern({ cmd: 'timers.fetchById' })
  async fetchTimer(id: string) {
    return this.appService.fetchTimer(id);
  }
}
