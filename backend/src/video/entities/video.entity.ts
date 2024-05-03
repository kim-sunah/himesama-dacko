// video.entity.ts
import { Channellist } from "src/channellist/entities/channellist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("video")
@Unique(['videoid'])
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    channelId: number;

    @Column()
    videoid: string;

    @Column()
    videotitle: string;

    @Column()
    videopublishedAt: string;

    @ManyToOne(() => Channellist, (channel) => channel.video)
    channel: Channellist;
}
