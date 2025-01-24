/* eslint-disable prettier/prettier */

import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {

   @PrimaryGeneratedColumn()
    category_id : IntegerType;

    @Column()
    category_name: string;
}