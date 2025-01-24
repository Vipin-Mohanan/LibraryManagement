/* eslint-disable prettier/prettier */
import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    reservation_id :IntegerType
    
    @Column()
    book_id :IntegerType
    
    @Column()
    member_id :IntegerType
    
    @Column()
    reservation_date: Date
    
    @Column()
    status: string
    
}
