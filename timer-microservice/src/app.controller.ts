import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Controller } from '@nestjs/common';
import { ICreateTimer, ISendMessage } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('timers.sendMessage')
  async sendMessage(data: ISendMessage) {
    console.log('sendMessage')
    return this.appService.sendMessage(data);
  }

  @MessagePattern({ cmd: 'timers.create' })
  async create(data: ICreateTimer) {
    console.log('createTimer')
    return this.appService.create(data);
  }

  @MessagePattern({ cmd: 'timers.fetchById' })
  async fetchTimer(id: string) {
    console.log('fetchTimer')
    return this.appService.fetchTimer(id);
  }
}
