
import { Search } from "src/search/entities/search.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    email : string
  
    @Column()
    nickname : string

    @OneToOne(() => Search)
 
    search: Search;

}
