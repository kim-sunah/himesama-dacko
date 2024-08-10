import { Auth } from "src/auth/entities/auth.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Search {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    search : string

    @OneToOne(() => Auth)
    @JoinColumn({name :"auth_id", referencedColumnName:"id"})
    auth: number;

}
