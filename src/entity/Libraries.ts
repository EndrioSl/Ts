import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'; 
import { Books } from './Books';
 
@Entity() 
export class Libraries { 
     
    @PrimaryGeneratedColumn() 
    id: number; 
     
    @OneToMany(
        () => Books,
        books => books.library,
        //{onDelete: "CASCADE"}
    )
    books: Books[];

    @Column({length: 50}) 
    email: string;  
     
    @Column({length: 20}) 
    password: string;  
     
    @Column({length: 50}) 
    nome_biblioteca: string;  
     
    /*@Column({length: 8}) 
    cep: string; 

    @Column({length: 50}) 
    estado: string;   
     
    @Column({length: 50}) 
    cidade: string;  
      
    @Column({length: 50}) 
    bairro: string;    
     
    @Column({length: 50}) 
    rua: string;  
     
    @Column({length: 6}) 
    numero: string;  
      
    @Column({length: 11}) 
    telefone: string;   
     
    @Column({type: "double", length: 4}) 
    mensalidade: number;   

    @Column({length: 50}) 
    imagem: string; */
 }