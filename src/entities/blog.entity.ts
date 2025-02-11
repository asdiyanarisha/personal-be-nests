import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  title: string;

  @Column('text')
  content: string;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @Column()
  slug: string;

  @Column({ nullable: true })
  url_image: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updatedAt!: Date;
}
