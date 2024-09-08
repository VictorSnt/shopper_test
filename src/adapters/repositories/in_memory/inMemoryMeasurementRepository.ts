import { MeasurementRepository } from '../../../application/interfaces/mesurementRepository';
import { Measurement } from '../../../domain/entities/measurement';
import { MeasureType } from '../../../domain/enum/mesurementType';



export class InMemoryMeasurementRepository implements MeasurementRepository {

  items: Measurement[] = []


  async saveObj(measurement: Measurement): Promise<Measurement> {
    this.items.push(measurement);
    return measurement;
  }

  async findObj(measurementId: string): Promise<Measurement | null> {
    return this.items.find(measure => measure.id === measurementId) || null;
  }

  async findAllByCustomerId(
    customerCode: string,
    measureType: MeasureType | null,
  ): Promise<Measurement[]> {
    return this.items.filter(measure => 
      measure.customerCode === customerCode &&
      (measureType === null || measure.measureType === measureType)
    );
  }
  

  async existsByMonthAndType(
    month: number, year: number, type: MeasureType
  ): Promise<boolean> {


    return this.items.some(measurement => {
      const measurementMonth = measurement.measureDatetime.getMonth() + 1;
      const measurementYear = measurement.measureDatetime.getFullYear();
      return measurementMonth === month &&
        measurementYear === year &&
        measurement.measureType === type;
    });
  }

  async confirmMeasure(
    measurement: Measurement, confirmedValue: number
  ): Promise<boolean> {
    measurement.confirmed = true;
    measurement.mesureValue = confirmedValue;
    return true
  }
}