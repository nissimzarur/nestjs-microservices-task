import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { SuperheroEntity } from 'src/entities/superhero/superhero.entity';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class SuperheroService {
  constructor(
    @Inject('SUPERHERO_RABBITMQ_SERVICE')
    private readonly rabbitClient: ClientProxy,
  ) {}

  async create(
    data: CreateSuperheroDto,
  ): Promise<Observable<CreateSuperheroDto>> {
    return this.rabbitClient.send({ cmd: 'superhero.create' }, data);
  }

  async getById(id: string): Promise<SuperheroEntity | null> {
    const obsSuperhero = this.rabbitClient.send<SuperheroEntity | null>(
      { cmd: 'superhero.getById' },
      id,
    );

    const superhero = await lastValueFrom(obsSuperhero);

    if (!superhero) {
      throw new HttpException('Superhero not found', HttpStatus.NOT_FOUND);
    }

    return superhero;
  }
}
