import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimerService } from './timer.service';
import { TimerEntity } from 'src/entities/timer/timer.entity';
import { SuperheroEntity } from 'src/entities/superhero/superhero.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TimerController } from './timer.controller';
import { SuperheroService } from '../superhero/superhero.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimerEntity, SuperheroEntity]),
    ClientsModule.registerAsync([
      {
        name: 'TIMERS_RABBITMQ_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('TIMERS_RABBITMQ_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'SUPERHERO_RABBITMQ_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('SUPERHERO_RABBITMQ_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TimerController],
  providers: [TimerService, SuperheroService],
  exports: [],
})
export class TimerModule {}
