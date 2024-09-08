import { v4 as uuidGen } from 'uuid';
import { expect, it } from 'vitest';
import { SaveMesurements, SaveMesurementsRequest } from './saveMesurement';
import { MeasureType } from '../../domain/enum/mesurementType';
import { InMemoryMeasurementRepository } from '../../adapters/repositories/in_memory/inMemoryMeasurementRepository';


it('Save a Measurement on database', async () => {
    const request: SaveMesurementsRequest = {
        imageUrl: 'localhost:3000',
        measure_value: 250,
        customer_code: uuidGen(),
        measure_datetime: new Date,
        measure_type: 'WATER' as MeasureType
    }

    const repo = new InMemoryMeasurementRepository();
    const saveMesurements = new SaveMesurements();
    const response = await saveMesurements.execute(request, repo);
    expect(response.status).toEqual(200);
})

