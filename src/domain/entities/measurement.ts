import { formatMeasureType } from '../../application/util/formaters';
import { MeasureType } from '../enum/mesurementType';
import { Measurement as MeasurementModel } from '../../adapters/models/measurement'
import { BaseEntitie } from './base';

interface MeasurementConstructorArgs {
  id?: string;
  image: string;
  mesureValue: number;
  customerCode: string;
  measureDatetime: Date;
  measureType: MeasureType;
  confirmed?: boolean;
}

export class Measurement extends BaseEntitie {

  image: string;
  mesureValue: number
  customerCode: string;
  measureDatetime: Date;
  measureType: MeasureType;
  confirmed: boolean = false

  constructor(
    measurementArgs: MeasurementConstructorArgs
  ) {
    super(measurementArgs.id);
    this.image = this.validateAndSetImage(measurementArgs.image);
    this.mesureValue = measurementArgs.mesureValue;
    this.customerCode = measurementArgs.customerCode;
    this.measureDatetime = measurementArgs.measureDatetime;
    this.measureType = formatMeasureType(measurementArgs.measureType);
    this.confirmed = measurementArgs.confirmed? true: false;
  }


  validateAndSetImage(imageUrl: string): string {
    try {
      new URL(imageUrl);
      return imageUrl;
    } catch (error) {
      throw new Error('Image must be a valid url string');
    }
  }

}