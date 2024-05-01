import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Video {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    videoId : string

    @Column()
    videotitle : string

    @Column()
    videoviewcount : number

    @Column()
    videolikecount : number

    @Column()
    videofavoritecount : number

    @Column()
    videocommentcount : number
}
