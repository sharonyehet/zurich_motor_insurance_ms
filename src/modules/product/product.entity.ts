import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('PRODUCT')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, type: 'varchar', length: 4 })
    productCode: string;

    @Column({ nullable: true, type: 'varchar', length: 128 })
    productDescription: string;

    @Column({ type: 'varchar', length: 128 })
    location: string;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    price: number;

    @CreateDateColumn({ type: 'timestamptz', select: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true, select: false })
    updatedAt: Date;

    @Column({ default: false, select: false })
    isDeleted: boolean;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true, select: false })
    deletedAt: Date;
}
