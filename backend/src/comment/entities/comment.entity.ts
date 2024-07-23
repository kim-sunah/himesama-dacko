import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { format } from 'date-fns-tz';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    createAt: string;  // Date 대신 string 사용

    @BeforeInsert()
    setCreateDate() {
        const koreaTime = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
        this.createAt = format(koreaTime, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Seoul' });
    }
}