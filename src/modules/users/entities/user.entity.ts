import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { hashSync } from 'bcrypt'

@Entity({name: "users"})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column()
    profile_image: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string

    @UpdateDateColumn({name: 'update_at'})
    updateAt: string

    @BeforeInsert()
    @BeforeUpdate()
    setHashPassword(){
        this.password = hashSync(this.password, 10)
    }
}