import { ConfirmMeasureService } from '../services/confirmMeasureService'
import { MeasurementRepository } from '../interfaces/mesurementRepository'

export interface ConfirmMeasurementRequest {
  measure_uuid: string,
  confirmed_value: number
}

export interface ConfirmMeasurementReponse {
  status: 200
  data: {
    success: true
  }
}

export class ConfirmMeasurement {
  async execute(
    request: ConfirmMeasurementRequest,
    repository: MeasurementRepository
  ): Promise<ConfirmMeasurementReponse> {

    const service = new ConfirmMeasureService(repository);
    const measurement = await service.findValidMeasure(request.measure_uuid);
    const confirmed = await service.confirmMeasurementValue(
      measurement, request.confirmed_value
    );

    if (!confirmed) {
      throw new Error('"error_code": "INVALID_DATA"');
    }

    return ({
      status: 200,
      data: {
        success: true
      }
    } as ConfirmMeasurementReponse)
  }
}