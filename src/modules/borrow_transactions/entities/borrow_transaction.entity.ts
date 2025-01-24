/* eslint-disable prettier/prettier */
import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm"



@Entity()
export class BorrowTransaction {

    
        @PrimaryGeneratedColumn()
        transaction_id:IntegerType
    
        @Column()
        book_id :IntegerType
    
        @Column()
        user_id :IntegerType
    
        @Column()
        borrow_date:Date
    
        @Column()
        due_date:Date
    
        @Column()
        return_date:Date
    
        @Column()
        status:string
    
    
}
