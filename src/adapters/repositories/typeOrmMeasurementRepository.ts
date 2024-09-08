import { Repository } from 'typeorm';
import { Measurement as MeasurementModel } from '../models/measurement';
import { Measurement as MeasurementEntitie } from '../../domain/entities/measurement';
import { MeasurementRepository } from '../../application/interfaces/mesurementRepository';
import { MeasureType } from 'domain/enum/mesurementType';


export class TypeORMMeasurementRepository
  extends Repository<MeasurementModel>
  implements MeasurementRepository {

  async saveObj(measurement: MeasurementEntitie): Promise<MeasurementEntitie> {
    const measurementModel = this.toModel(measurement);

    const measure = await this.save(measurementModel);
    return this.toEntity(measure)
  }

  async findObj(measurementId: string): Promise<MeasurementEntitie | null> {
    const measureModel = await this.findOne({ where: { id: measurementId } }) || null;
    if (!measureModel) return null;
    return this.toEntity(measureModel);
  }

  async findAllByCustomerId(
    customerCode: string, measureType: string | null
  ): Promise<MeasurementEntitie[]> {
    const query = this.createQueryBuilder('measurement')
      .where('measurement.customerCode = :customerCode', { customerCode });

    if (measureType) {
      query.andWhere('measurement.measureType = :measureType', { measureType });
    }
    const measurementModelList = await query.getMany();
    if (measurementModelList.length === 0) return [];
    const measureEntities = measurementModelList.map(measureModel => this.toEntity(measureModel))
    return measureEntities
  }

  async existsByMonthAndType(
    month: number, 
    year: number, 
    type: MeasureType,
    customer_code: string
  ): Promise<boolean> {

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const count = await this.createQueryBuilder('measurement')
      .where('measurement.customerCode = :customer_code', { customer_code })
      .andWhere(
        'measurement.measureDatetime BETWEEN :startDate AND :endDate',
        { startDate, endDate }
      )
      .andWhere('measurement.measureType = :type', { type })
      .getCount();

    return count > 0;
  }

  async confirmMeasure(measurement: MeasurementEntitie, confirmedValue: number): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .update(MeasurementModel)
      .set({ confirmed: true, mesureValue: confirmedValue })
      .where('id = :id', { id: measurement.id })
      .execute();

    return result?.affected !== undefined && result.affected > 0;
  }

  private toEntity(measureModel: MeasurementModel): MeasurementEntitie {
    const measurement = new MeasurementEntitie(measureModel);
    return measurement;
  }

  private toModel(measurementEntity: MeasurementEntitie): MeasurementModel {
    const measurementModel = new MeasurementModel();

    measurementModel.image = measurementEntity.image;
    measurementModel.mesureValue = measurementEntity.mesureValue;
    measurementModel.customerCode = measurementEntity.customerCode;
    measurementModel.measureDatetime = measurementEntity.measureDatetime;
    measurementModel.measureType = measurementEntity.measureType;

    return measurementModel;
  }
}
