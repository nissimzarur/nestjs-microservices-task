import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateTimerDto {
  @IsInt()
  @Min(0)
  hours: number;

  @IsInt()
  @Min(0)
  minutes: number;

  @IsInt()
  @Min(0)
  seconds: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  superheroId: string;
}
