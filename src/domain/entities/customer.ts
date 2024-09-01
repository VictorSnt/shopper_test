import { BaseEntitie } from './base';

export class Customer extends BaseEntitie {
  public readonly name: string;

  constructor(name: string) {
    super(undefined);
    this.name = this.formatName(name);
  }

  public formatName(name: string): string {
    if (name.length < 5) {
      throw new Error('Customer name must have at least 5 chars')
    }
    return name.toUpperCase();
  }
  
}