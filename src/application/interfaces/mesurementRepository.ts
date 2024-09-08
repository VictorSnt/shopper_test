import { Measurement } from '../../domain/entities/measurement';
import { MeasureType } from '../../domain/enum/mesurementType';


export interface MeasurementRepository {

  saveObj(measurement: Measurement): Promise<Measurement>;

  findObj(measurementId: string): Promise<Measurement | null>;

  findAllByCustomerId(
    customerCode: string,
    measureType: string | null,
  ): Promise<Measurement[]|[]>;

  existsByMonthAndType(
    month: number, year: number, type: MeasureType, customer_code: string
  ): Promise<boolean>;

  confirmMeasure(
    measurement: Measurement, confirmedValue: number
  ): Promise<boolean>;
}   
