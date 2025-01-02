import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  //! id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //! sku
  @Column('text', { unique: true })
  sku: string;

  //! name
  @Column('text')
  name: string;

  //! description
  @Column({
    type: 'text',
  })
  description: string;

  //! additional_info
  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  additional_info: string;

  //! price
  @Column('float', {
    default: 0.0,
  })
  price: number;

  //! stock
  @Column('int', {
    default: 0,
  })
  stock: number;

  //! rating
  @Column('float', {
    default: 0.0,
  })
  rating: number;

  //! createdBy
  @Column('uuid')
  createdBy: string;

  //! createdAt
  @CreateDateColumn()
  createdAt: Date;

  //! updatedAt
  @Column('date', { nullable: true, default: null })
  updatedAt: Date;

  //TODO add category_id, tag_id, image_id
}
