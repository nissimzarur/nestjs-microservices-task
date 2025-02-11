import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperheroEntity } from 'src/entities/superhero/superhero.entity';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuperheroEntity]),
    ClientsModule.registerAsync([
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
  controllers: [SuperheroController],
  providers: [SuperheroService],
  exports: [SuperheroService],
})
export class SuperheroModule {}
