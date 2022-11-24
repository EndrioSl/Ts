import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'; 
import { Libraries } from './Libraries';
 
@Entity() 
export class Books { 
      
    @PrimaryGeneratedColumn()
    id:number;    

    @ManyToOne(
        () => Libraries,
        library => library.books
        //{onDelete: 'CASCADE'}
    )
    library: Libraries
     
    @Column({length: 13}) 
    isbn: string;
      
    @Column({length: 50})
    title: string;
   
    @Column({length: 50})
    author: string;
    
    @Column({length: 50}) 
    publisher: string;   
     
    @Column({ type: "int", width: 2 } ) 
    edition: number;
     
    @Column({length: 30}) 
    topic: string; 

    @Column({ type: "int", width: 4 }) 
    year_published: number; 

    @Column()
    description: string; 
     
    @Column({ 
        default: true
    }) 
    status: boolean;   
    
    @CreateDateColumn()
    created_at: Date;
}
