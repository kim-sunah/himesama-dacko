import { Channellist } from "src/channellist/entities/channellist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("videofavorite")
export class videofavorite {
    @PrimaryGeneratedColumn()
    id: number;


}
