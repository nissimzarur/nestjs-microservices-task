import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TimerService } from './timer.service';
import { CreateTimerDto } from './dto/create-timer.dto';

@Controller('timers')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @Post()
  async createTimer(@Body() createTimerDto: CreateTimerDto) {
    return this.timerService.create(createTimerDto);
  }

  @Get(':id')
  async getTimer(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.timerService.getTimer(id);
  }
}
