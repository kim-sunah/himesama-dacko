import { Channellist } from "src/channellist/entities/channellist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("videoview")
export class videoview {
    @PrimaryGeneratedColumn()
    id: number;


}
