import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SuperheroEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  alias: string;

  @Column('text', { array: true })
  powers: string[];
}
