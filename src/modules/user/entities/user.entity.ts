/* eslint-disable prettier/prettier */
import { IsEmpty } from "class-validator";
import { BorrowTransaction } from "src/modules/borrow_transactions/entities/borrow_transaction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';

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
        phone_number:number
    
        @Column()
        @IsEmpty()
        address:string
    
        @Column()
        @IsEmpty()
        membership_date:Date
    
        @Column()
        @IsEmpty()
        membership_status:boolean
   
        @OneToMany(() => BorrowTransaction, (borrowTransaction) => borrowTransaction.user)
        borrowtransactions: BorrowTransaction[];

        @OneToMany(()=>Reservation,(reservation)=>reservation.users)
        reservation:Reservation[]
}
