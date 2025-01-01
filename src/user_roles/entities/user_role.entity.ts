import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_roles')
export class UserRole {
  //! id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //! name
  @Column('text', { unique: true })
  name: string;

  //! createdAt
  @CreateDateColumn()
  createdAt: Date;

  //! updatedAt
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.name = this.name.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
