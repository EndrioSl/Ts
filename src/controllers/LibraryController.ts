import { getRepository } from "typeorm"; 
import { Libraries } from "../entity/Libraries"; 
import { Request, Response } from "express";  
 
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
    const library = await getRepository(Libraries).save(request.body); 
    return response.json(library);  
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
} 
 