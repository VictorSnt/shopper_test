import { BaseValidator } from './baseValidator';
import { MeasurementRepository } from '../../interfaces/mesurementRepository';
import { AlreadyMesuredException } from 'domain/exceptions/domainExceptions';
import { MeasureType } from '../../../domain/enum/mesurementType';


export interface ValidateDuplicateMeasureFields {
  measure_datetime: Date;
  measure_type: MeasureType;
  customer_code: string;
}

export class UsecaseValidator extends BaseValidator {

  static async validateDuplicateMeasure(
    repository: MeasurementRepository,
    data: ValidateDuplicateMeasureFields,
  ): Promise<void> {
    const month = data.measure_datetime.getMonth() + 1;
    const year = data.measure_datetime.getFullYear();
  
    const exists = await repository.existsByMonthAndType(
      month, year, data.measure_type, data.customer_code
    );
  
    if (exists) {
      throw new AlreadyMesuredException(
        'Measurement already exists for the given month, type, and customer.'
      );
    }
  }
}