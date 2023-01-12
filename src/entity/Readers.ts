import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm'; 
import { Libraries } from './Libraries';
import { Loans } from './Loans';
 
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
     
    @OneToMany(
        () => Loans,
        loan => loan.reader,
        //{onDelete: "CASCADE"}
    )
    loan: Loans[];   
       
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
