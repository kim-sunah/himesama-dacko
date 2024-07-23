// channellist.entity.ts
import { Video } from "src/video/entities/video.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()

export class Channellist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Channel_nickname: string;

    @Column({ nullable: true })
    Channel_Url_Id: string;

    @Column()
    Channel_Id: string;

    @Column({ type: "bigint" })
    subscriberCount: number;

    @Column()
    categoryid : number

    // @Column({ type: "bigint", nullable: true , default :0})
    // previous_subscriberCount: number | null;

    @Column({ type: "float", nullable: true ,default :0})
    subscriberCount_percentageincrease: number | null;

    @Column({ type: "float", nullable: true, default :0})
    week_subscriberCount_percentageincrease: number | null;

    @Column({ type: "float", nullable: true, default :0})
    month_subscriberCount_percentageincrease: number | null;

    @Column({ type: "bigint" })
    videoCount: number;

    // @Column({ type: "bigint", nullable: true, default :0 })
    // previous_videoCount: number | null;

    @Column({ type: 'bigint' })
    viewCount: number;

    // @Column({ type: "bigint", nullable: true, default :0 })
    // previous_viewCount: number | null;

    @Column({ type: "float", nullable: true, default :0})
    viewCount_percentageincrease: number | null;

    @Column({ type: "float", nullable: true, default :0})
    week_viewCount_percentageincrease: number | null;

    @Column({ type: "float", nullable: true, default :0})
    month_viewCount_percentageincrease: number | null;

    @Column()
    channel_img: string;

    @OneToMany(() => Video, (video) => video.channel)
    video: Video[];
}
