import { Measurement } from '../../adapters/models/measurement';
import { AppDataSource } from '../../adapters/config/data-source';
import { MeasurementRepository } from '../../application/interfaces/mesurementRepository';
import { TypeORMMeasurementRepository } from '../../adapters/repositories/typeOrmMeasurementRepository';

export class MeasurementRepositoryFactory {

  static makeRepository(): MeasurementRepository{
    return new TypeORMMeasurementRepository(
      AppDataSource.getRepository(Measurement).target,
      AppDataSource.manager
    )
    
  } 
}
