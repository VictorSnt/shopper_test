import { AssertionError } from 'assert';
import { InvalidArgsException } from '../../../domain/exceptions/domainExceptions';


export abstract class BaseValidator {


  static handleValidationError(error: any): void {
    if (error instanceof AssertionError) {
      throw new InvalidArgsException(`Validation error: ${error.message}`)
    }
    throw error;
  }
}

