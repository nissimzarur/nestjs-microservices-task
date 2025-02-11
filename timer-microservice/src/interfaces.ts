import { SuperheroEntity } from './entities/superhero/superhero.entity';

export interface ISendMessage {
  id: string;
  name: string;
  message: string;
  url: string;
  delay: number;
}

export type ICreateTimer = {
  hours: number;
  minutes: number;
  seconds: number;
  message: string;
  url: string;
  superhero: SuperheroEntity;
};
