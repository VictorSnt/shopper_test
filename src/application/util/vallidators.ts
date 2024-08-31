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
  validateStringField(request.customer_code, 'customer_code');
  validateStringField(request.image, 'image');
  validateDateTime(request.measure_datetime);
  validateStringField(request.measure_type, 'measure_type');

  return {
    image: request.image,
    customer_code: request.customer_code,
    measure_datetime: new Date(request.measure_datetime),
    measure_type: formatMeasureType(request.measure_type),
  };
}

function validateStringField(value: any, fieldName: string): void {
  try {
    assert(typeof value === 'string',
      `${fieldName} must be set and must be a string`);
  } catch (error: any) {
    handleValidationError(error);
  }
}

function validateDateTime(value: any): void {
  const datetimePattern = (
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:[+-]\d{2}:\d{2}|Z)?)?$/
  );
  try {
    assert(typeof value === 'string' && datetimePattern.test(value),
      'measure_datetime must be a valid ISO 8601 datetime string'
    );
  } catch (error: any) {
    handleValidationError(error);
  }
}

export function validateConfirmMeasurementRequestBody(
  request: ConfirmMeasurementRequest
): ConfirmMeasurementRequest {
  validateIntegerField(request.confirmed_value, 'confirmed_value');
  validateStringField(request.measure_uuid, 'measure_uuid');

  return request;
}


function validateIntegerField(value: any, fieldName: string): void {
  try {
    assert(
      typeof value === 'number' && Number.isInteger(value),
      `${fieldName} must be set and must be an integer`
    );
  } catch (error: any) {
    handleValidationError(error);
  }
}

function handleValidationError(error: any): void {
  if (error instanceof AssertionError) {
    throw new Error(`Validation error: ${error.message}`);
  }
  throw error;
}


export interface ValidateDuplicateMeasureFields {
  measure_datetime: Date;
  measure_type: MeasureType;
  customer_code: string;
}

export async function validateDuplicateMeasure(
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
