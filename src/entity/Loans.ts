import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne, ManyToOne} from 'typeorm'; 
import { Libraries } from './Libraries';
import { Readers } from './Readers';
 
@Entity() 
export class Loans { 
     
    @PrimaryGeneratedColumn() 
    id: number;   
     
    @OneToOne(() => Readers)
    @JoinColumn()
    readers: Readers 
     
    @Column({ 
        default: true
    }) 
    status: boolean;   

    @CreateDateColumn()
    created_at: Date;
     
 }