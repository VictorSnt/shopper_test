class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

interface AlreadyMesuredResponse {
  error_code: string,
  error_description: string
}

export class AlreadyMesuredException extends CustomError {

  public status: number = 409
  public response: AlreadyMesuredResponse = {
    error_code: 'DOUBLE_REPORT',
    error_description: 'Leitura do mês já realizada'
  }

  constructor(message = 'Resource not found') {
    super(message);
  }
}

export class MeasureNotFoundException extends CustomError {
  public status: number = 404
  public response: AlreadyMesuredResponse = {
    error_code: 'MEASURE_NOT_FOUND',
    error_description: 'Leitura do mês já realizada'
  }

  constructor(message = 'Resource not found') {
    super(message);
  }
}

export class MeasureAlreadyConfirmedException extends CustomError {
  public status: number = 409
  public response: AlreadyMesuredResponse = {
    error_code: 'CONFIRMATION_DUPLICATE',
    error_description: 'Leitura do mês já realizada'
  }


  constructor(message = 'confirmed already') {
    super(message);
  }
}

export class CustomerMeasureNotFoundException extends CustomError {
  public status: number = 404
  public response: AlreadyMesuredResponse = {
    error_code: 'MEASURE_NOT_FOUND',
    error_description: 'Nenhum registro encontrado'
  }

  constructor(message = 'Resource not found') {
    super(message);
  }
}