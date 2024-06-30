import { Channellist } from "src/channellist/entities/channellist.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Video } from "./video.entity";

@Entity("videolike")
export class videolike {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoId: number;

  @Column({default:0, type: 'bigint'})
  today: number;


  @Column({default:0, type: 'bigint'})
  One_Month_Ago: number;


  @Column({default:0, type: 'bigint'})
  Two_Month_Ago: number;

  
  @Column({default:0, type: 'bigint'})
  Three_Month_Ago: number;
  
  @Column({default:0, type: 'bigint'})
  Four_Month_Ago: number;
  
  @Column({default:0, type: 'bigint'})
  Five_Month_Ago: number;
  
  @Column({default:0, type: 'bigint'})
  Six_Month_Ago: number;
  
  @Column({default:0, type: 'bigint'})
  Seven_Month_Ago: number;
  
  @Column({default:0, type: 'bigint'})
  Eigth_Month_Ago: number;

  @Column({default:0, type: 'bigint'})
  Nine_Month_Ago: number;

  @Column({default:0, type: 'bigint'})
  Ten_Month_Ago: number;

  @Column({default:0, type: 'bigint'})
  Eleven_Month_Ago: number;

  @Column({default:0, type: 'bigint'})
  Twelve_Month_Ago: number;


  @OneToOne(() => Video, video => video.videolike , { onDelete: 'CASCADE' })
  video: Video;


}
