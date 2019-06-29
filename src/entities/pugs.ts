import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pugs')
export class pugs {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'idpugs',
  })
  idpugs: number;

  @Column('varchar', {
    nullable: false,
    length: 45,
    name: 'map',
  })
  map: string;

  @Column('int', {
    nullable: false,
    name: 'winner',
  })
  winner: number;

  // @Column({
  //   nullable: true,
  //   default: 'CURRENT_TIMESTAMP',
  //   name: 'date',
  // })
  // date: Date | null;

  @Column('varchar', {
    nullable: true,
    length: 45,
    name: 'logslink',
  })
  logslink: string | null;

}