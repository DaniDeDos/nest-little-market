import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  //! id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //! fullname
  @Column('text')
  fullname: string;

  //! username
  @Column('text')
  username: string;

  //! password
  @Column('text', {
    select: false,
  })
  password: string;

  //! email
  @Column('text', {
    unique: true,
  })
  email: string;

  //! role_id
  @Column('text', {
    array: true,
    default: ['gest'],
  })
  role_id?: string[];

  //! createdAt
  @CreateDateColumn()
  createdAt: Date;

  //! updatedAt
  @Column('date', { nullable: true, default: null })
  updatedAt: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.fullname = this.fullname.toLowerCase().trim();
    this.username = this.username.toLowerCase().trim();
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
