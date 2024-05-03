import { Channellist } from "src/channellist/entities/channellist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("videosubscriber")
export class videosubscriber {
    @PrimaryGeneratedColumn()
    id: number;


}
