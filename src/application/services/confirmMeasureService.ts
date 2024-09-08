import { Measurement } from '../../domain/entities/measurement';
import { MeasureAlreadyConfirmedException, MeasureNotFoundException } from '../../domain/exceptions/domainExceptions';
import { MeasurementRepository } from '../interfaces/mesurementRepository';

export class ConfirmMeasureService {
  constructor(private readonly repository: MeasurementRepository) { }

  
  async findValidMeasure(measurementId: string): Promise<Measurement> {
    const measure = await this.repository.findObj(measurementId);
    if (!measure) throw new MeasureNotFoundException('id Not found on Database');
    if (measure.confirmed) throw new MeasureAlreadyConfirmedException(
      'Measure already confirmed');
    return measure;
  }

  async confirmMeasurementValue(
    measure: Measurement, measureValue: number
  ): Promise<boolean> {

    if (!measureValue || measureValue < 0) {
      throw new Error('Invalid measure_value');
    }
    const result = await this.repository.confirmMeasure(measure, measureValue);
    return result
  }
}