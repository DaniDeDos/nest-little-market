import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  //! id
  id: string;

  @Column('text')
  //! username
  username: string;

  @Column('text', {
    select: false,
  })
  //! password
  password: string;

  @Column('text', {
    unique: true,
  })
  //! email
  email: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  //! role_id
  role_id: string[];

  /* 
  TODO:
  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
    */
}
