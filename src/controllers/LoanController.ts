import { getRepository } from "typeorm"; 
import { Loans } from "../entity/Loans";  
import { Request, Response } from "express";  
import { Books } from "../entity/Books"; 
import { Readers } from "../entity/Readers";
import { Libraries } from "../entity/Libraries";
 
const RELATIONS = { relations: ['book', 'reader'] }; 
const NO_RELATIONS = {};     
 
export const findIdBookLoans = async (id: string, relations=true): Promise<Loans> => {
    const relation = relations ? RELATIONS : NO_RELATIONS; 
    const loan = await getRepository(Loans).findOne({
        ...relation, 
        where: { book : id },
    }); 
    return loan;  
}    

export const findIdReaderLoans = async (id: string, relations=true): Promise<Loans> => {
    const relation = relations ? RELATIONS : NO_RELATIONS; 
    const loan = await getRepository(Loans).findOne({
        ...relation, 
        where: { reader : id },
    }); 
    return loan;  
}   
 
export const findLibraryLoans = async (id: string, relations=true): Promise<Loans> => {
    const relation = relations ? RELATIONS : NO_RELATIONS; 
    const loan = await getRepository(Loans).findOne({
        ...relation, 
        where: { library : id },
    }); 
    return loan;  
}   
 
export const getLoans = async (request: Request, response: Response) => {
    const loans = await getRepository(Loans).find();   
    console.log(loans);

    return response.json(loans);   
}; 
  
export const getLoan = async (request: Request, response: Response) => {
   const { id } = request.params; 
   const loan = await await getRepository(Loans).findOne(id); 
   
   return response.json(loan);
};   
  
export const saveLoan = async (request: Request, response: Response) => {
    const loan: Loans = request.body;   
    const readerId = request.params.readerId;  
    const id = request.params.id;   
    const libradyId = request.params.libradyId;  
    
    const book = await getRepository(Books).findOne({where: { id: id }});   
     
    const reader = await getRepository(Readers).findOne({where: { id: readerId }});    
       
    const library = await getRepository(Libraries).findOne({where: { id: libradyId }});    

    const checkBookLoan = await findIdBookLoans(id);   
     
    if(!book) return response.status(404).json({ message: 'Livro não encontrada' }); 
     
    if (!reader) return response.status(404).json({ message: 'Leitor não encontrada' }); 
     
    if(checkBookLoan != undefined)  return response.status(404).json({ message: 'Esse livro já está emprestado a outro leitor' });

    loan.book = book;   
     
    loan.reader = reader;   
     
    loan.library = library;

    await getRepository(Loans).save(loan); 

    return response.json(loan);  
};

export const updateLoan = async (request: Request, response: Response) => {
    const { id } = request.params; 
    const loan = await getRepository(Loans).update(id, request.body); 
 
    if (loan.affected === 1){ 
        const updatedLoan = await getRepository(Loans).findOne(id); 
        return response.json(updatedLoan);   
    } 
     
    return response.status(404).json({ message: 'Livro não encontrado' });  
};    

 
export const deleteLoan = async (request: Request, response: Response) => { 
    const { id } = request.params; 
    const loan = await getRepository(Loans).delete(id); 
 
    if (loan.affected === 1){ 
        const loanUpdate = await getRepository(Loans).findOne(id)
        return response.json({ message: 'Livro removido!' })
    } 
     
    return response.status(404).json({ message: 'Livro não encontrado' });  
}  
 
