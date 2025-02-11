import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { SuperheroEntity } from './entities/superhero/superhero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(SuperheroEntity)
    private readonly superheroRepo: Repository<SuperheroEntity>,
  ) {}

  async createSuperhero(dto: CreateSuperheroDto) {
    const superhero = this.superheroRepo.create(dto);
    return await this.superheroRepo.save(superhero);
  }

  async getSuperheroById(id: string) {
    const response = await this.superheroRepo.findOne({ where: { id } });

    if (!response) {
      return null;
    }

    return response;
  }
}
