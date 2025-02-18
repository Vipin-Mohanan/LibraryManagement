/* eslint-disable prettier/prettier */
import { IsEmpty } from "class-validator";
import { BorrowTransaction } from "../../borrow_transactions/entities/borrow_transaction.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from '../../reservations/entities/reservation.entity';


@Entity()
export class User {
        @PrimaryGeneratedColumn()
        user_id:number
    
        @Column()
        @IsEmpty()
        name:string
    
        @Column()
        @IsEmpty()
        email:string

        @Column()
        @IsEmpty()
        password:string
    
        @Column()
        @IsEmpty()
        phone_number:number
    
        @Column()
        @IsEmpty()
        address:string
    
        @CreateDateColumn({ type: 'timestamp' })  // Auto inserts current timestamp
        membership_date: Date;
      
        @Column({ type: 'boolean', default: true })  // Default value is true
        membership_status: boolean;
   
        @OneToMany(() => BorrowTransaction, (borrowTransaction) => borrowTransaction.user)
        borrowtransactions: BorrowTransaction[];

        @OneToMany(()=>Reservation,(reservation)=>reservation.users)
        reservation:Reservation[]
}
