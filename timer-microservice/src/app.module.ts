import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TimerEntity } from './entities/timer/timer.entity';
import { SuperheroEntity } from './entities/superhero/superhero.entity';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([TimerEntity, SuperheroEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Disable in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
