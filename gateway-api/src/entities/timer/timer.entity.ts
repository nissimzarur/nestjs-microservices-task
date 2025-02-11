import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SuperheroEntity } from '../superhero/superhero.entity';

@Entity()
export class TimerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  message: string;

  @Column()
  triggerAt: Date;

  @ManyToOne(() => SuperheroEntity)
  superhero: SuperheroEntity;
}
