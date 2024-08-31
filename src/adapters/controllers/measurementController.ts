import { UploadAndProcessImage } from '../../application/usecases/uploadAndProcessImage';
import { SaveMesurementsRequest, SaveMesurements } from '../../application/usecases/saveMesurement';
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { TypeORMMeasurementRepository } from '../repositories/typeOrmMeasurementRepository';
import { Measurement } from '../models/measurement';
import { MeasureType } from '../../domain/enum/mesurementType';
import { validateConfirmMeasurementRequestBody, validateDuplicateMeasure, validateUpdateRequestBody } from '../../application/util/vallidators';
import { ConfirmMeasurement, ConfirmMeasurementRequest } from '../../application/usecases/confirmMeasurement';
import { formatMeasureType } from '../../application/util/formaters';
import { ListCustomerMeasures, ListCustomerMeasuresRequest } from '../../application/usecases/listCustomerMeasures';

export interface UploadMeasurementControllerRequestBody {
  image: string,
  customer_code: string,
  measure_datetime: Date,
  measure_type: MeasureType
}


export class MeasurementController {

  // Route to upload a image in base64  read it value and save
  // a measurement on the database
  public static async UploadMeasure(
    req: Request<{}, {}, UploadMeasurementControllerRequestBody>,
    res: Response
  ): Promise<void> {

    try {
      req.body = validateUpdateRequestBody(req.body);
    } catch (error: any) {
      res.status(400).json({
        'error_code': 'INVALID_DATA',
        'error_description': error.message
      })
      return;
    }

    const repository = new TypeORMMeasurementRepository(
      AppDataSource.getRepository(Measurement).target,
      AppDataSource.manager,
    );

    try {
      await validateDuplicateMeasure(repository, {
        measure_datetime: req.body.measure_datetime,
        measure_type: req.body.measure_type,
        customer_code: req.body.customer_code
      });
    } catch (error: any) {
      if (!error?.status) {
        res.status(500).json({ message: 'Oops something went wrong!' });
        return;
      }
      res.status(error.status).json(error.response);
      return;
    }

    const saveMeasurement = new SaveMesurements()
    const uploadImage = new UploadAndProcessImage();
    try {
      const uploadImageResponse = await uploadImage.execute({
        imageBase64String: req.body.image
      });
      const { imageUrl, measureValue } = uploadImageResponse;
      const saveMesurerequest: SaveMesurementsRequest = {
        imageUrl: imageUrl,
        measure_value: measureValue,
        customer_code: req.body.customer_code,
        measure_datetime: req.body.measure_datetime,
        measure_type: req.body.measure_type
      }

      const response = await saveMeasurement.execute(
        saveMesurerequest, repository
      )

      res.status(response.status).json(response.data);
      return;

    } catch (error) {
      res.status(429).json({
        message: 'Oops too many request on generativeAI!'
      });
      return;
    }
  }

  // Confirmate a mesurement 
  public static async ConfirmMeasure(
    req: Request<{}, {}, ConfirmMeasurementRequest>,
    res: Response
  ): Promise<void> {
    try {
      req.body = validateConfirmMeasurementRequestBody(req.body);
    } catch (error: any) {
      res.status(400).json({
        'error_code': 'INVALID_DATA',
        'error_description': error.message
      })
      return;
    }

    const repository = new TypeORMMeasurementRepository(
      AppDataSource.getRepository(Measurement).target,
      AppDataSource.manager,
    );

    const confirMeasurementRequest = {
      measure_uuid: req.body.measure_uuid,
      confirmed_value: req.body.confirmed_value
    }

    const confirMeasurement = new ConfirmMeasurement();
    try {
      const response = await confirMeasurement.execute(
        confirMeasurementRequest, repository
      );
      res.status(response.status).json(response.data)
      return;
    } catch (error: any) {
      if (!error?.status) {
        res.status(500).json({ message: 'Oops something went wrong!' });
        return;

      }
      res.status(error.status).json(error.response);
      return;
    }
  }


  public static async ListCustomerMeasurements(
    req: Request<
      { customer_code: string }, {},
      ConfirmMeasurementRequest, { measure_type: MeasureType | null }
    >,
    res: Response
  ): Promise<void> {
    try {
      if (req.query.measure_type) {
        req.query.measure_type = formatMeasureType(
          req.query.measure_type
        );
      }
    } catch (error) {
      res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida'
      })
      return;
    }

    const repository = new TypeORMMeasurementRepository(
      AppDataSource.getRepository(Measurement).target,
      AppDataSource.manager,
    );

    const listCustomersRequest: ListCustomerMeasuresRequest = {
      customer_code: req.params.customer_code,
      measure_type: req.query.measure_type ?? null
    }

    const listCustomerMeasurements = new ListCustomerMeasures();
    try {
      const response = await listCustomerMeasurements.execute(
        listCustomersRequest, repository
      );
      res.status(response.status).json(response.data)
      return;
    } catch (error: any) {
      if (!error?.status) {
        res.status(500).json({ message: 'Oops something went wrong!' });
        return;

      }
      res.status(error.status).json(error.response);
      return;
    }
  }
}


