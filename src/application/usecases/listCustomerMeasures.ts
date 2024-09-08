
import { ListCustomerMeasuresService } from '../services/listCustomerMeasuresService'
import { MeasurementRepository } from '../interfaces/mesurementRepository'
import { MeasurementDTO } from '../../domain/dto/measurementDTO'

export interface ListCustomerMeasuresRequest {
  customer_code: string,
  measure_type: string | null
}

export interface ListCustomerMeasuresReponse {
  status: 200
  data: {
    customer_code: string
    measures: MeasurementDTO[]
  }
}

export class ListCustomerMeasures {
  async execute(
    request: ListCustomerMeasuresRequest,
    repository: MeasurementRepository
  ): Promise<ListCustomerMeasuresReponse> {

    const service = new ListCustomerMeasuresService(repository);
    const measurements = await service.getMeasurementsOrFail(
      request.customer_code, request.measure_type
    )

    return ({
      status: 200,
      data: {
        customer_code:request.customer_code,
        measures: measurements
      }
      
    } as ListCustomerMeasuresReponse)

  }
}