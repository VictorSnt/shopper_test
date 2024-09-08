import { strict as assert, AssertionError } from 'assert';
import { BaseValidator } from './baseValidator';


export class TypeValidator extends BaseValidator {
  

  static validateInteger(value: any, fieldName: string): void {
    try {
      assert(
        typeof value === 'number' && Number.isInteger(value),
        `${fieldName} must be set and must be an integer`
      );
    } catch (error: any) {
      TypeValidator.handleValidationError(error);
    }
  }
  
  static validateDateTime(value: any): void {
    const datetimePattern = (
      /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:[+-]\d{2}:\d{2}|Z)?)?$/
    );
    try {
      assert(typeof value === 'string' && datetimePattern.test(value),
        'measure_datetime must be a valid ISO 8601 datetime string'
      );
    } catch (error: any) {
      TypeValidator.handleValidationError(error);
    }
  }
  
  static validateString(value: any, fieldName: string): void {
    try {
      assert(typeof value === 'string',
        `${fieldName} must be set and must be a string`);
    } catch (error: any) {
      TypeValidator.handleValidationError(error);
    }
  }
}

