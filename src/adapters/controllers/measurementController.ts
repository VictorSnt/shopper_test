import { UploadAndProcessImage } from '../../application/usecases/uploadAndProcessImage'
import {
  SaveMesurementsRequest,
  SaveMesurements,
} from '../../application/usecases/saveMesurement'
import { Request, Response } from 'express'
import { MeasureType } from '../../domain/enum/mesurementType'

import {
  ConfirmMeasurement,
  ConfirmMeasurementRequest,
} from '../../application/usecases/confirmMeasurement'
import { formatMeasureType } from '../../application/util/formaters'
import {
  ListCustomerMeasures,
  ListCustomerMeasuresRequest,
} from '../../application/usecases/listCustomerMeasures'
import { errorHandler } from '../../adapters/middleware/errorHandler'
import { UsecaseValidator } from '../../application/util/validators/usecaseValidators'
import { RequestBodyValidator } from 'application/util/validators/requestBodyValidators'
import { MeasurementRepositoryFactory } from 'application/factories/measurementRepositoryFactory'


export interface UploadMeasurementControllerRequestBody {
  image: string
  customer_code: string
  measure_datetime: Date
  measure_type: MeasureType
}

export class MeasurementController {

  public static async UploadMeasure(
    req: Request<{}, {}, UploadMeasurementControllerRequestBody>,
    res: Response,
  ): Promise<void> {
    try {

      const requestBody = (
        RequestBodyValidator
          .getvalidatedUpdateRequestBody(req.body)
      );

      const repository = MeasurementRepositoryFactory.makeRepository();

      await UsecaseValidator.validateDuplicateMeasure(repository, requestBody);

      const saveMeasurement = new SaveMesurements();
      const uploadImage = new UploadAndProcessImage();

      const uploadImageResponse = await uploadImage.execute({
        imageBase64String: requestBody.image,
      });

      const { imageUrl, measureValue } = uploadImageResponse;
      const saveMesurerequest: SaveMesurementsRequest = {
        imageUrl: imageUrl,
        measure_value: measureValue,
        customer_code: requestBody.customer_code,
        measure_datetime: requestBody.measure_datetime,
        measure_type: requestBody.measure_type,
      }

      const response = await saveMeasurement.execute(
        saveMesurerequest,
        repository,
      );

      res.status(response.status).json(response.data)
    } catch (error) {
      errorHandler(error, res);
    }
  }


  public static async ConfirmMeasure(
    req: Request<{}, {}, ConfirmMeasurementRequest>,
    res: Response,
  ): Promise<void> {
    try {

      const requestBody = (
        RequestBodyValidator
          .getValidatedConfirmMeasurementRequestBody(req.body)
      );

      const repository = MeasurementRepositoryFactory.makeRepository();

      const confirMeasurement = new ConfirmMeasurement()
      const response = await confirMeasurement.execute(
        requestBody,
        repository,
      )
      res.status(response.status).json(response.data)
    } catch (error: any) {
      errorHandler(error, res)
    }
  }

  public static async ListCustomerMeasurements(
    req: Request<
      { customer_code: string },
      {},
      ConfirmMeasurementRequest,
      { measure_type: MeasureType | null }
    >,
    res: Response
  ): Promise<void> {
    try {
      if (req.query.measure_type) {
        req.query.measure_type = formatMeasureType(req.query.measure_type);
      }

      const repository = MeasurementRepositoryFactory.makeRepository();

      const listCustomersRequest: ListCustomerMeasuresRequest = {
        customer_code: req.params.customer_code,
        measure_type: req.query.measure_type ?? null
      };

      const listCustomerMeasurements = new ListCustomerMeasures();
      
      const response = await listCustomerMeasurements.execute(
        listCustomersRequest, repository
      );

      res.status(response.status).json(response.data);
    } catch (error: any) {
      errorHandler(error, res)
    }
  }
}
