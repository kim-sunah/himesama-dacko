// video.entity.ts
import { Channellist } from "src/channellist/entities/channellist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("videocomment")
export class videocomment {
    @PrimaryGeneratedColumn()
    id: number;


}
