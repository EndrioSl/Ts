import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany} from 'typeorm'; 
import { Libraries } from './Libraries';
 
@Entity() 
export class Readers { 
     
    @PrimaryGeneratedColumn() 
    id: number; 
 
    @ManyToMany(
        () => Libraries,
        libraries => libraries.readers,
        //{ onDelete: "CASCADE"}
      )
      libraries: Libraries[]; 

    @Column({length: 50}) 
    email: string;  
     
    @Column() 
    password: string;  
     
    @Column({length: 50}) 
    nome: string;   
     
     
    /*@Column({length: 11}) 
    cpf: string; 
      
    @Column({length: 11}) 
    telefone: string;   
     
    @Column({type: "double", length: 4}) 
    mensalidade: number;   

    @Column({length: 50}) 
    imagem: string; */ 
     
 } 
