// video.entity.ts
import { Channellist } from "src/channellist/entities/channellist.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { videoview } from "./videoview.entity";
import { videocomment } from "./videocomment.entity";
import { videolike } from "./videolike.entity";

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

    @ManyToOne(() => Channellist, (channel) => channel.video, { onDelete: 'CASCADE' })
    channel: Channellist;

    @OneToOne(() => videoview,  videoview => videoview.video )
    videoview: videoview;

    @OneToOne(() => videocomment,  videocomment => videocomment.video )
    videocomment: videocomment;

    @OneToOne(() => videolike,  videolike => videolike.video )
    videolike: videolike;
}
