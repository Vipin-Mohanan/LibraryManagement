/* eslint-disable prettier/prettier */
import { Book } from 'src/modules/books/entities/book.entity';
import { Fine } from 'src/modules/fines/entities/fine.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"



@Entity()
export class BorrowTransaction {

    
        @PrimaryGeneratedColumn({name:"transaction_id"})
        transaction_id:number
    
   
        @ManyToOne(()=>Book,(book)=>book.borrowTransactions,{ onDelete: 'CASCADE' })
        @JoinColumn({name:'book_id', referencedColumnName:'book_id'})
        books:Book[]



        @ManyToOne(() => User, (user) => user.borrowtransactions, { onDelete: 'CASCADE' })
        @JoinColumn({ name: 'user_id',  referencedColumnName: 'user_id' })
        user: User;


        @Column()
        borrow_date:Date
    
        @Column()
        due_date:Date
    
        @Column()
        return_date:Date
    
        @Column()
        status:string
    

       @OneToOne(()=>Fine, (fine)=>fine.borrowTransaction)
       fine: Fine[];


    
    
}
