import { Router } from 'express';
import { MeasurementController } from '../controllers/measurementController';

export const router = Router();

router.post('/upload', MeasurementController.UploadMeasure);
router.patch('/confirm', MeasurementController.ConfirmMeasure);
router.get('/:customer_code/list', MeasurementController.ListCustomerMeasurements);