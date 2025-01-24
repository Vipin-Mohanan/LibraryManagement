/* eslint-disable prettier/prettier */

import { Column, Entity, IntegerType, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity()
export class AuditLog {

    @PrimaryGeneratedColumn()
    log_id :IntegerType;

    @Column()
    action_performed:string;

    @Column()
    user_id:IntegerType;

    @Column()
    timestamp:Timestamp
}
