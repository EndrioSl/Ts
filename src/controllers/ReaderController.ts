import { getRepository, SimpleConsoleLogger } from "typeorm"; 
import { Readers } from "../entity/Readers"; 
import { Request, Response } from "express";  
import { hash } from "../common/bcrypt.helpers"; 
import { validateLogin } from "./Login"; 

export const getReaders = async (request: Request, response: Response) => {
    const readers = await getRepository(Readers).find();  
    return response.json(readers);   
}; 
 
export const getReader = async (request: Request, response: Response) => {
    const { id } = request.params; 
    const reader = await getRepository(Readers).findOne(id); 
    return response.json(reader);
};  
 
export const saveReader = async (request: Request, response: Response) => {
    const reader = request.body;   
    reader.password = await hash(reader.password);  
     
    await getRepository(Readers).save(reader);

    return response.json(reader);  
};

export const updateReader = async (request: Request, response: Response) => {
    const { id } = request.params; 
    const reader = await getRepository(Readers).update(id, request.body); 
 
    if (reader.affected === 1){ 
        const updatedreader = await getRepository(Readers).findOne(id); 
        return response.json(updatedreader);   
    } 
     
    return response.status(404).json({ message: 'Leitor não encontrado' });  
};    
 
export const deleteReader = async (request: Request, response: Response) => { 
    const { id } = request.params; 
    const reader = await getRepository(Readers).delete(id); 
 
    if (reader.affected === 1){ 
        const readerUpdate = await getRepository(Readers).findOne(id)
        return response.json({ message: 'Leitor removido!' })
    } 
     
    return response.status(404).json({ message: 'Leitor não encontrado' }); 

}; 
 
export const getReaderLogin = async (request: Request, response: Response) => {
    const {email, password} = request.body;
    const readerLogin = await validateLogin(email, password);    
    if (!readerLogin) 
        return response.status(404).json({ message: 'Leitor não encontrado' });

    const reader = await getRepository(Readers).findOne(readerLogin.id);

    return response.json(reader);
    };    
