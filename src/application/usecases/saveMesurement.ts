import { Measurement } from '../../domain/entities/measurement';
import { MeasureType } from '../../domain/enum/mesurementType';
import { MeasurementService } from '../services/measureServices';
import { MeasurementRepository } from '../interfaces/mesurementRepository';
import { AlreadyMesuredException } from '../../domain/exceptions/domainExceptions';

export interface SaveMesurementsRequest {
  imageUrl: string;
  measure_value: number;
  customer_code: string,
  measure_datetime: Date,
  measure_type: MeasureType
}

export interface SaveMesurementsResponse {
  status: 200,
  data: {
    image_url: string,
    measure_value: number,
    measure_uuid: string
  }
}

export class SaveMesurements {
  async execute(
    request: SaveMesurementsRequest,
    repository: MeasurementRepository
  ):
    Promise<SaveMesurementsResponse> {

    const measurementService = new MeasurementService(repository);

    const measure = new Measurement({
      image: request.imageUrl,
      mesureValue: request.measure_value,
      customerCode: request.customer_code,
      measureType: request.measure_type,
      measureDatetime: request.measure_datetime
    });

    const savedMeasure = await measurementService.saveObj(measure);

    return {
      status: 200,
      data: {
        image_url: savedMeasure.image,
        measure_value: savedMeasure.mesureValue,
        measure_uuid: savedMeasure.id
      }
    } as SaveMesurementsResponse
  }
}