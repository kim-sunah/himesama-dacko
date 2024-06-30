// videoview.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Video } from './video.entity';

@Entity('videoview')
export class videoview {
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





  @OneToOne(() => Video, video => video.videoview , { onDelete: 'CASCADE' })
  video: Video;
}
