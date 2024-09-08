import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from 'typeorm';

export abstract class BaseEntitie extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Column({ type: 'boolean', default: true })
  public status!: boolean;

  @Column({ type: 'varchar', length: 25, default: () => 'CURRENT_TIMESTAMP' })
  public created_at!: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  public updated_at?: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  public deleted_at?: string;
  
  public getCreatedAt(): Date {
      return new Date(this.created_at);
  }

  public setCreatedAt(date: Date) {
      this.created_at = date.toISOString();
  }

  public getUpdatedAt(): Date | undefined {
      return this.updated_at ? new Date(this.updated_at) : undefined;
  }

  public setUpdatedAt(date: Date) {
      this.updated_at = date.toISOString();
  }

  public getDeletedAt(): Date | undefined {
      return this.deleted_at ? new Date(this.deleted_at) : undefined;
  }

  public setDeletedAt(date: Date) {
      this.deleted_at = date.toISOString();
  }
}
