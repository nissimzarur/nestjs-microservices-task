import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  alias: string;

  @IsArray()
  @IsString({ each: true })
  powers: string[];
}
