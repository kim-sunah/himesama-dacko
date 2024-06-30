import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channellist } from "./channellist.entity";


@Entity()

export class SubscriberCount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0, type: 'bigint' })
    Today: number;

    @Column({ default: 0, type: 'bigint' })
    One_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Two_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Three_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Four_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Five_day_Ago: number;
    
    @Column({ default: 0, type: 'bigint' })
    Six_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Sevent_day_Ago: number;
   
    @Column({ default: 0, type: 'bigint' })
    Eigth_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Nine_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Ten_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Eleven_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    twelve_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    thirteen_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    fourteen_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    fifteen_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    sixteen_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    seventeen_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Eigthteen_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Nineteen_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Twenty_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Twenty_one_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Twenty_two_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Twenty_three_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Twenty_four_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Twenty_five_day_Ago: number;
 
    @Column({ default: 0, type: 'bigint' })
    Twenty_six_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Twenty_seven_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Twenty_eigth_day_Ago: number;

    @Column({ default: 0, type: 'bigint' })
    Twenty_nine_day_Ago: number;

    @Column()
    channelId: number;

    @OneToOne(() => Channellist)
    @JoinColumn()
    channel : Channellist;

}