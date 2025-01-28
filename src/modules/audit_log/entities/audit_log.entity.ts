/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class AuditLog {

    @PrimaryGeneratedColumn()
    log_id :number;

    @Column()
    action_performed:string;

    @Column()
    user_id:number;

    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

}
