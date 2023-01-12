import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne, ManyToOne} from 'typeorm'; 
import { Books } from './Books';
import { Libraries } from './Libraries';
import { Readers } from './Readers';
 
@Entity() 
export class Loans { 
     
    @PrimaryGeneratedColumn() 
    id: number;   
     
    @OneToOne(() => Books)
    @JoinColumn()
    book: Books  
     
    @ManyToOne(
        () => Readers,
        readers => readers.loan
        //{onDelete: 'CASCADE'}
    )
    reader: Readers   
     
    @ManyToOne(
        () => Libraries,
        library => library.loan
        //{onDelete: 'CASCADE'}
    )
    library: Libraries  
     
    @Column({ 
        default: true
    }) 
    status: boolean;   

    @CreateDateColumn()
    created_at: Date;
     
 }