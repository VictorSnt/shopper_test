import { expect, it } from 'vitest';
import { Measurement } from './measurement';
import { validate as validateUUID } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { MeasureType } from 'domain/enum/mesurementType';

it('Create a measure', () => {

  const measurement = new Measurement({
    image: 'http://localhost:3000',
    mesureValue: 2,
    customerCode: uuidv4(),
    measureType: 'WATER' as MeasureType,
    measureDatetime: new Date()
  });

  expect(measurement).toBeInstanceOf(Measurement);
  expect(validateUUID(measurement.id)).toBeTruthy();
  expect(validateUUID(measurement.customerCode)).toBeTruthy();
  expect(measurement.created_at).toBeInstanceOf(Date);
})


it('Fail to create a measure with invalid measure_type', () => {
  expect(() => {
    const measurement = new Measurement({
      image: 'http://localhost:3000',
      mesureValue: 2,
      customerCode: uuidv4(),
      measureType: 'eletricity' as MeasureType,
      measureDatetime: new Date()
    });
  }).toThrow();
});

it('Fail to create a measure with invalid image url', () => {
  expect(() => {
    const measurement = new Measurement({
      image: '552562',
      mesureValue: 2,
      customerCode: uuidv4(),
      measureType: 'WATER' as MeasureType,
      measureDatetime: new Date()
    });
  }).toThrow();
});
