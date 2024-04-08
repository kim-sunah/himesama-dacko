import { Column, PrimaryGeneratedColumn ,Entity } from "typeorm";

@Entity()
export class Channellist {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    Channel_nickname : string

    @Column()
    Channel_Url_Id : string

    @Column()
    Channel_Id : string

    @Column({type : "bigint"})
    subscriberCount : number

    @Column({ type: "bigint", nullable: true })
    previous_subscriberCount: number | null;

    @Column({type : "bigint"})
    videoCount : number

    @Column({ type: "bigint", nullable: true })
    previous_videoCount: number | null;

    @Column({ type: 'bigint' })
    viewCount : number 

    @Column({ type: "bigint", nullable: true })
    previous_viewCount: number | null;

    @Column()
    Channel_img : string

    @Column()
    Channel_category : string

}
