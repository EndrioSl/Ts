import { getRepository, ILike, SimpleConsoleLogger } from "typeorm"; 
import { Libraries } from "../entity/Libraries"; 
import { Request, Response } from "express";  
import { hash } from "../common/bcrypt.helpers"; 
import { validateLogin } from "./LoginLibrary";  
import { Readers } from "../entity/Readers";   
import { findByIdReader } from "./ReaderController";
 
  
const RELATIONS = { relations: ['readers'] }; 
const NO_RELATIONS = {};  
  

export const getLibraries = async (request: Request, response: Response) => {
    const libraries = await getRepository(Libraries).find();  
    return response.json(libraries);   
}; 
 
export const getLibrary = async (request: Request, response: Response) => {
    const { id } = request.params; 
    const library = await getRepository(Libraries).findOne(id); 
    return response.json(library);
};  
 
export const saveLibrary = async (request: Request, response: Response) => {
    const library = request.body;   
    library.password = await hash(library.password);  
     
    await getRepository(Libraries).save(library);

    return response.json(library);  
};  
 
export const findByIdLibrary = async (id: string, relations=true): Promise<Libraries> => {
    const relation = relations ? RELATIONS : NO_RELATIONS;
    const library = await getRepository(Libraries).findOne({

        ...relation,
    }); 
    return library;  
}  
  
export const addLibraryReader = async (request: Request, response: Response) => { 
    
    const id = request.params.id;  
    const libraryId = request.params.libraryId;  
 
    const library = await findByIdLibrary(libraryId);  
    const newReaderLibrary = await findByIdReader(id);     +

    library.readers.push(newReaderLibrary);
 
    await getRepository(Libraries).save(library); 
         
    return response.status(201).json({ message: 'Leitor vinculado a biblioteca corretamente' });  
};  
 
export const removeLibraryReader = async (request: Request, response: Response) => {  
     
    const id = request.params.id;  
    const libraryId = request.params.libraryId;  
 
    const library = await findByIdLibrary(libraryId);  
    const removeReaderLibrary = await findByIdReader(id);     
     
    library.readers = library.readers.filter((readers) => {
        return library.readers[0].id !== removeReaderLibrary.id; 
    })
 
    await getRepository(Libraries).save(library);    

}; 

export const updateLibrary = async (request: Request, response: Response) => {
    const { id } = request.params; 
    const library = await getRepository(Libraries).update(id, request.body); 
 
    if (library.affected === 1){ 
        const updatedlibrary = await getRepository(Libraries).findOne(id); 
        return response.json(updatedlibrary);   
    } 
     
    return response.status(404).json({ message: 'Biblioteca não encontrado' });  
};    
 
export const deleteLibrary = async (request: Request, response: Response) => { 
    const { id } = request.params; 
    const library = await getRepository(Libraries).delete(id); 
 
    if (library.affected === 1){ 
        const libraryUpdate = await getRepository(Libraries).findOne(id)
        return response.json({ message: 'Biblioteca removido!' })
    } 
     
    return response.status(404).json({ message: 'Biblioteca não encontrado' }); 

};  
 
export const getLibraryLogin = async (request: Request, response: Response) => {
    const {email, password} = request.body;
    const libraryLogin = await validateLogin(email, password);    
    if (!libraryLogin) 
        return response.status(404).json({ message: 'Biblioteca não encontrado' });

    const library = await getRepository(Libraries).findOne(libraryLogin.id);

    return response.json(library);
    };    
