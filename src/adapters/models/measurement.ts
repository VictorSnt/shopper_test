import { Entity, Column } from 'typeorm';
import { BaseEntitie } from './base';
import { MeasureType } from '../../domain/enum/mesurementType';

@Entity()
export class Measurement extends BaseEntitie {

    @Column({ type: 'varchar', length: 255 })
    public image!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    public mesureValue!: number;

    @Column({ type: 'varchar', length: 50 })
    public customerCode!: string;

    // Change to 'varchar' to store dates as strings in SQLite
    @Column({ type: 'varchar', length: 25 })
    public measureDatetime!: Date;

    @Column({ type: 'varchar' })
    public measureType!: MeasureType;

    @Column({ type: 'boolean', default: false })
    public confirmed!: boolean;

}
