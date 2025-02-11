import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  create(@Body() data: CreateSuperheroDto) {
    console.log("Create Superhero")
    return this.superheroService.create(data);
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log("Fetch Superhero")
    return this.superheroService.getById(id);
  }
}
