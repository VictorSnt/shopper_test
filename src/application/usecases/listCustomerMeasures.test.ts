import { expect, it, beforeEach } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { Measurement } from '../../domain/entities/measurement';
import { ListCustomerMeasures, ListCustomerMeasuresRequest } from './listCustomerMeasures';
import { InMemoryMeasurementRepository } from '../../adapters/repositories/in_memory/inMemoryMeasurementRepository';
import { MeasureType } from 'domain/enum/mesurementType';

let repo: InMemoryMeasurementRepository;
let listCustomerMeasures: ListCustomerMeasures;
let uniqueId: string

beforeEach(() => {
  repo = new InMemoryMeasurementRepository();
  listCustomerMeasures = new ListCustomerMeasures();
  uniqueId = uuidv4();
});

const createMeasurement = (type: string) => new Measurement({
  image: 'http://localhost:3000',
  mesureValue: 2,
  customerCode: uniqueId,
  measureType: type as MeasureType,
  measureDatetime: new Date()
});

it('should get customer measurements successfully', async () => {
  const measurement = createMeasurement('WATER');
  await repo.saveObj(measurement);

  const request: ListCustomerMeasuresRequest = {
    customer_code: measurement.customerCode,
    measure_type: 'WATER'
  };

  const response = await listCustomerMeasures.execute(request, repo);
  expect(response.status).toEqual(200);
});

it('should get customer measurements with type WATER', async () => {
  const [measurement1, measurement2, measurement3] = [
    createMeasurement('WATER'),
    createMeasurement('WATER'),
    createMeasurement('GAS')
  ];

  await repo.saveObj(measurement1);
  await repo.saveObj(measurement2);
  await repo.saveObj(measurement3);

  const request: ListCustomerMeasuresRequest = {
    customer_code: measurement1.customerCode,
    measure_type: 'WATER'
  };

  const response = await listCustomerMeasures.execute(request, repo);
  expect(response.status).toEqual(200);
  expect(response.data.measures.length).toEqual(2);
});

it('should throw an error if no measurements are found', async () => {
  const measurement = createMeasurement('WATER');
  await repo.saveObj(measurement);

  const request: ListCustomerMeasuresRequest = {
    customer_code: measurement.customerCode,
    measure_type: 'GAS'
  };

  await expect(listCustomerMeasures.execute(request, repo)).rejects
    .toThrow('This customerCode has no measurements');
});

it('should throw an error for invalid measure_type', async () => {
  const measurement = createMeasurement('WATER');
  await repo.saveObj(measurement);

  const request: ListCustomerMeasuresRequest = {
    customer_code: measurement.customerCode,
    measure_type: 'francisca'
  };

  await expect(listCustomerMeasures.execute(request, repo)).rejects
    .toThrow('MeasureType must be "WATER" or "GAS" lowercase or uppercase');
});
