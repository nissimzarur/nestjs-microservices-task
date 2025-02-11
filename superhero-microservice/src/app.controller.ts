import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'superhero.create' })
  async createSuperhero(data: CreateSuperheroDto) {
    return this.appService.createSuperhero(data);
  }

  @MessagePattern({ cmd: 'superhero.getById' })
  async getSuperheroById(id: string) {
    return this.appService.getSuperheroById(id);
  }
}
