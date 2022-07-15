import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; 
 
@Entity() 
export class Books { 
      
    @PrimaryGeneratedColumn()
    id:number; 
      
    @Column()
    title: string;
   
    @Column()
    author: string;
  
    @Column()
    description: string; 
     
    @Column({ 
        default: true
    }) 
    status: boolean;
}
