import { formatMeasureType } from '../util/formaters';
import { MeasurementRepository } from '../interfaces/mesurementRepository';
import { CustomerMeasureNotFoundException } from '../../domain/exceptions/domainExceptions';
import { MeasurementDTO } from '../../domain/dto/measurementDTO';

export class ListCustomerMeasuresService {
  constructor(private readonly repository: MeasurementRepository) { }

  async getMeasurementsOrFail(
    customerCode: string,
    measureType: string | null = null
  ): Promise<MeasurementDTO[]> {

    if (measureType) {
      measureType = formatMeasureType(measureType)
    }

    const measurements = await this.repository.findAllByCustomerId(
      customerCode, measureType
    );

    if (!Array.isArray(measurements) || measurements.length === 0) {
      throw new CustomerMeasureNotFoundException(
        'This customerCode has no measurements'
      );
    }
    const measurementDTOs: MeasurementDTO[] = measurements.map(measure => {
      return({
        measure_uuid: measure.id,
        measure_datetime: new Date(measure.measureDatetime), 
        measure_type: measure.measureType,
        has_confirmed: measure.confirmed,
        image_url: measure.image
      } as MeasurementDTO)
    })
    return measurementDTOs;
  }
}