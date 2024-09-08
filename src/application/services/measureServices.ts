
import { Measurement } from '../../domain/entities/measurement';
import { MeasureType } from '../../domain/enum/mesurementType';
import { MeasurementRepository } from '../../application/interfaces/mesurementRepository';


export class MeasurementService {
  constructor(private readonly measurementRepository: MeasurementRepository) { }

  async isMeasurementAlreadyExistsForMonthAndType(
    measure_datetime: Date, type: MeasureType, customer_code: string
  ): Promise<boolean> {
    const month = measure_datetime.getMonth() + 1;
    const year = measure_datetime.getFullYear();
    return (
      await this.measurementRepository.existsByMonthAndType(
        month, year, type, customer_code
      )
    );
  }

  async saveObj(measurement: Measurement): Promise<Measurement> {
    return this.measurementRepository.saveObj(measurement);
  }
}
