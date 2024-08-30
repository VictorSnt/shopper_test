import { strict as assert, AssertionError } from 'assert';
import { UploadMeasurementControllerRequestBody } from '../../adapters/controllers/measurementController';
import { MeasurementRepository } from '../../domain/repositories/mesurementRepository';
import { MeasureType } from '../../domain/enum/mesurementType';
import { AlreadyMesuredException } from '../../domain/exceptions/domainExceptions';
import { formatMeasureType } from './formaters';
import { ConfirmMeasurementRequest } from '../../application/usecases/confirmMeasurement';

export function validateUpdateRequestBody(
  request: UploadMeasurementControllerRequestBody
): UploadMeasurementControllerRequestBody {
  try {
    assert(
      typeof request.customer_code === 'string',
      'customer_code must be set and must be a string'
    );
    assert(
      typeof request.image === 'string',
      'image must be set and must be a string'
    );
    assert(
      request.measure_datetime instanceof Date && !isNaN(request.measure_datetime.getTime()),
      'measure_datetime must be set and must be a Date object'
    );
    assert(
      typeof request.measure_type === 'string',
      'measure_type must be set and must be a string'
    );
  } catch (error: any) {
    if (error instanceof AssertionError) {
      throw new Error(`Validation error: ${error.message}`);
    }
    throw error;
  }
  return ({
    image: request.image,
    customer_code: request.customer_code,
    measure_datetime: request.measure_datetime,
    measure_type: formatMeasureType(request.measure_type)
  })
}

export function validateConfirmeMeasureRequestBody(
request: ConfirmMeasurementRequest
): ConfirmMeasurementRequest {
  try {
    assert(
      typeof request.confirmed_value === 'number' &&
      Number.isInteger(request.confirmed_value),
      'confirmed_value must be set and must be an integer'
    );
    assert(
      typeof request.measure_uuid === 'string',
      'image must be set and must be a string'
    );
  } catch (error: any) {
    if (error instanceof AssertionError) {
      throw new Error(`Validation error: ${error.message}`);
    }
    throw error;
  }
  return request
}


export interface validateDuplicateMeasureFields {
  measure_datetime: Date
  measure_type: MeasureType
  customer_code: string
}
export async function validateDuplicateMeasure(
  repository: MeasurementRepository, 
  data: validateDuplicateMeasureFields, 
): Promise<void> {
  const month = data.measure_datetime.getMonth() + 1;
  const year = data.measure_datetime.getFullYear();
  const exists = (
    await repository.existsByMonthAndType(
      month, year, data.measure_type, data.customer_code
    )
  )
  if (exists) {
    throw new AlreadyMesuredException('can\'t duplicate measure')
  }
}
