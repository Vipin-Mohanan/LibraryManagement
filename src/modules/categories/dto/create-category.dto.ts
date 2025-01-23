/* eslint-disable prettier/prettier */

import { Column, PrimaryColumn } from 'typeorm';

export class CreateCategoryDto {

    @PrimaryColumn()
    category_id : bigint;

    @Column()
    category_name: string;
}
