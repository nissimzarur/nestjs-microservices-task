import { IsUUID } from 'class-validator';

export class GetSuperheroDto {
  @IsUUID()
  id: string;
}
