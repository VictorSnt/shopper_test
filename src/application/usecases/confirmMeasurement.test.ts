import { expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';

import { ConfirmMeasurement, ConfirmMeasurementRequest } from './confirmMeasurement';
import { Measurement } from '../../domain/entities/measurement';
import { MeasureType } from '../../domain/enum/mesurementType';
import { InMemoryMeasurementRepository } from '../../adapters/repositories/in_memory/inMemoryMeasurementRepository';


it('Confirm a Measurement', async () => {

  const uniqueId = uuidv4()
  const measurement = new Measurement({
    image: 'http://localhost:3000',
    mesureValue: 2,
    customerCode: uniqueId,
    measureType: 'WATER' as MeasureType,
    measureDatetime: new Date()
  });

  const request: ConfirmMeasurementRequest = {
    measure_uuid: measurement.id,
    confirmed_value: 15
  };

  const repo = new InMemoryMeasurementRepository();
  await repo.saveObj(measurement);
  const confirmMeasurement = new ConfirmMeasurement();
  const response = await confirmMeasurement.execute(request, repo);
  expect(response.status).toEqual(200);
  expect(async ()=>{
  const response = await confirmMeasurement.execute(request, repo);
  }).rejects
  .toThrow('Measure already confirmed');
})


it('Fail because the measure_uuid does not exist', () => {
  const uniqueId = uuidv4();
  const request: ConfirmMeasurementRequest = {
    measure_uuid: uniqueId,
    confirmed_value: 15
  };

  const repo = new InMemoryMeasurementRepository();
  const confirmMeasurement = new ConfirmMeasurement();
  expect(async () => {
    const response = await confirmMeasurement.execute(request, repo);
  }).rejects
  .toThrow('id Not found on Database');
})