import { InjectRepository } from '@nestjs/typeorm';
import { TimerEntity } from './entities/timer/timer.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ICreateTimer, ISendMessage } from './interfaces';
import axios from 'axios';

export class AppService {
  constructor(
    @InjectRepository(TimerEntity)
    private readonly timerRepo: Repository<TimerEntity>,
  ) {}

  async create(data: ICreateTimer) {
    const triggerAt = new Date();
    triggerAt.setHours(triggerAt.getHours() + data.hours);
    triggerAt.setMinutes(triggerAt.getMinutes() + data.minutes);
    triggerAt.setSeconds(triggerAt.getSeconds() + data.seconds);

    const timerEntity = this.timerRepo.create({
      url: data.url,
      message: data.message,
      triggerAt: triggerAt,
      superhero: data.superhero,
    });

    console.log(data.superhero);

    const newTimer = await this.timerRepo.save(timerEntity);

    const delay = triggerAt.getTime() - Date.now();

    return { ...newTimer, delay: delay / 1000 };
  }

  async sendMessage(data: ISendMessage) {
    console.log(
      `📅 Timer scheduled in ${data.delay / 1000} seconds for ${data.url}`,
    );

    // Delay execution using setTimeout
    setTimeout(async () => {
      console.log(`⏳ Timer expired! Sending message to ${data.url}`);
      try {
        await axios.post(data.url, {
          id: data.id,
          name: data.name,
          message: data.message,
        });
        console.log(`✅ Message sent successfully!`);
      } catch (error) {
        console.error(`❌ Failed to send message: ${error.message}`);
      }
    }, data.delay);
  }

  async fetchTimer(id: string) {
    const timer = await this.timerRepo.findOne({ where: { id } });

    if (!timer) {
      return null;
    }

    const timeLeft = Math.max(
      0,
      (timer.triggerAt.getTime() - Date.now()) / 1000,
    );

    return { id: timer.id, timeLeft };
  }
}
