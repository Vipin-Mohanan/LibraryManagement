/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { IsEmpty } from "class-validator";
import { BorrowTransaction } from '..//../borrow_transactions/entities/borrow_transaction.entity';
import { Column, Entity, IntegerType, JoinColumn,  OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fine {

        @PrimaryGeneratedColumn()
        fine_id:number
    
        @OneToOne(()=>BorrowTransaction, (borrowtransaction)=>borrowtransaction.fine)
        @JoinColumn({name:"transaction_id"})
        borrowTransaction:BorrowTransaction[]

        @IsEmpty()
        @Column()
        fine_amount:number
    
        @IsEmpty()
        @Column()
        payment_status:boolean
    
        @IsEmpty()
        @Column()
        fine_date:Date
}
