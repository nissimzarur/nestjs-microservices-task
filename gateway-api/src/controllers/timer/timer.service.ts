import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTimerDto } from './dto/create-timer.dto';
import { ClientProxy } from '@nestjs/microservices';
import { TimerEntity } from 'src/entities/timer/timer.entity';
import { lastValueFrom, timeout } from 'rxjs';
import { SuperheroService } from '../superhero/superhero.service';

@Injectable()
export class TimerService {
  constructor(
    @Inject('TIMERS_RABBITMQ_SERVICE')
    private readonly timerClient: ClientProxy,
    private readonly superheroService: SuperheroService,
  ) {}

  async create(data: CreateTimerDto) {
    const superhero = await this.superheroService.getById(data.superheroId);

    if (!superhero) throw new Error('Invalid superhero ID');

    const params = {
      hours: data.hours,
      minutes: data.minutes,
      seconds: data.seconds,
      message: data.message,
      url: data.url,
      superhero,
    };

    const obsTimer = this.timerClient
      .send<TimerEntity & { delay: number }>({ cmd: 'timers.create' }, params)
      .pipe(timeout(10000));

    const timer = await lastValueFrom(obsTimer);

    // Send the message to RabbitMQ with delay
    this.timerClient.emit('timers.sendMessage', {
      id: timer.id,
      name: superhero.name,
      message: data.message,
      url: data.url,
      delay: timer.delay,
    });

    return { id: timer.id, timeLeft: timer.delay };
  }

  async getTimer(id: string): Promise<TimerEntity> {
    const obsTimer = this.timerClient
      .send({ cmd: 'timers.fetchById' }, id)
      .pipe(timeout(5000));

    const timer = await lastValueFrom(obsTimer);

    if (!timer)
      throw new HttpException('Timer not found', HttpStatus.NOT_FOUND);

    return timer;
  }
}
