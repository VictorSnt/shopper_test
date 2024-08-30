import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntitie {

  public readonly id: string
  private status: boolean = true;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(id: string|undefined) {
    this.id = id !== undefined? id: this.generateGUID();
    this.created_at = new Date();
  }

  private generateGUID(): string {
    return uuidv4();
  }

  public isActive(): boolean {
    return this.status
  }
}