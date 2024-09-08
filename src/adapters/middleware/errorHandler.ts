import { DomainException } from '../../domain/exceptions/domainExceptions';
import { Response } from 'express';


export function errorHandler(err: any, res: Response) {
  if (err instanceof DomainException) {
    return res.status(err.status).json(err.response);
  }
  console.error(err);
  res.status(500).json({ message: 'Oops something went wrong!' });
}