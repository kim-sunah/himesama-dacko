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

    @Column()
    subscriberCount : number

    @Column()
    videoCount : number

    @Column({ type: 'bigint' })
    viewCount : number 

    @Column()
    Channel_img : string

    @Column()
    Channel_category : string

}
