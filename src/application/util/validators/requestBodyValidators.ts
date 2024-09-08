import { 
  ConfirmMeasurementRequest 
} from '../../../application/usecases/confirmMeasurement';

import { 
  UploadMeasurementControllerRequestBody 
} from '../../../adapters/controllers/measurementController';

import { formatMeasureType } from '../formaters';
import { BaseValidator } from './baseValidator';
import { TypeValidator } from './typeValidators';

export class RequestBodyValidator extends BaseValidator {

  static getvalidatedUpdateRequestBody(
    request: UploadMeasurementControllerRequestBody
  ): UploadMeasurementControllerRequestBody {
    TypeValidator.validateString(request.customer_code, 'customer_code');
    TypeValidator.validateString(request.image, 'image');
    TypeValidator.validateDateTime(request.measure_datetime);
    TypeValidator.validateString(request.measure_type, 'measure_type');
  
    return {
      image: request.image,
      customer_code: request.customer_code,
      measure_datetime: new Date(request.measure_datetime),
      measure_type: formatMeasureType(request.measure_type),
    };
  }

  static getValidatedConfirmMeasurementRequestBody(
    request: ConfirmMeasurementRequest
  ): ConfirmMeasurementRequest {
    TypeValidator.validateInteger(request.confirmed_value, 'confirmed_value');
    TypeValidator.validateString(request.measure_uuid, 'measure_uuid');
  
    return request;
  }
}