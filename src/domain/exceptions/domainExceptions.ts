export class DomainException extends Error {
  public status!: number
  public response!: BaseErrorResponse

  constructor(message?: string) {
    super(message);

  }
}

interface BaseErrorResponse {
  error_code: string
  error_description: string
}

export class AlreadyMesuredException extends DomainException {
  public status: number = 409
  public response: BaseErrorResponse = {
    error_code: 'DOUBLE_REPORT',
    error_description: 'Leitura do mês já realizada',
  }
}

export class MeasureNotFoundException extends DomainException {
  public status: number = 404
  public response: BaseErrorResponse = {
    error_code: 'MEASURE_NOT_FOUND',
    error_description: 'Leitura do mês já realizada',
  }
}

export class MeasureAlreadyConfirmedException extends DomainException {
  public status: number = 409
  public response: BaseErrorResponse = {
    error_code: 'CONFIRMATION_DUPLICATE',
    error_description: 'Leitura do mês já realizada',
  }
}

export class CustomerMeasureNotFoundException extends DomainException {
  public status: number = 404
  public response: BaseErrorResponse = {
    error_code: 'MEASURE_NOT_FOUND',
    error_description: 'Nenhum registro encontrado',
  }
}

export class MeasureTypeInvalidException extends DomainException {
  public status: number = 400
  public response: BaseErrorResponse = {
    error_code: 'INVALID_TYPE',
    error_description: 'Tipo de medição não permitida',
  }
}


export class InvalidArgsException extends DomainException {
  public status: number = 400
  public response: BaseErrorResponse = {
    error_code: 'INVALID_DATA',
    error_description: 'Tipo de medição não permitida',
  }
  constructor(error_description: string, msg?: string) {
    super(msg)
    this.response.error_description = error_description;
  }
}

export class TimeoutException extends DomainException {
  public status: number = 408
  public response: BaseErrorResponse = {
    error_code: 'REQUEST_TIMEOUT',
    error_description: 'Falha ao processar!, Por favor tente novamente',
  }
  constructor(error_description?: string, msg?: string) {
    super(msg)
    this.response.error_description = (
      error_description ?? this.response.error_description);
  }
}