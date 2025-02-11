import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperheroModule } from './controllers/superhero/superhero.module';
import { TimerModule } from './controllers/timer/timer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SuperheroModule,
    TimerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
