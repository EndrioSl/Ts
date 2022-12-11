import { getRepository } from "typeorm"; 
import { Books } from "../entity/Books";  
import { Libraries } from "../entity/Libraries"; 
import { Request, Response } from "express";  
 
export const getBooks = async (request: Request, response: Response) => {
    const books = await getRepository(Books).find(); 
    return response.json(books);  

}; 
  
export const getBook = async (request: Request, response: Response) => {
   const { id } = request.params; 
   const book = await getRepository(Books).findOne(id); 
   return response.json(book);
};   
 
export const getBookLibrary = async (request: Request, response: Response) => { 
    const { libraryId } = request.params; 
    const libraryBooks = await getRepository(Books).find({
        where: {
            libraryId: '1'
        },
    })

    return response.json(libraryBooks);
  }
 
 
export const saveBook = async (request: Request, response: Response) => {
    const book = await getRepository(Books).save(request.body); 
    return response.json(book);  
};

export const updateBook = async (request: Request, response: Response) => {
    const { id } = request.params; 
    const book = await getRepository(Books).update(id, request.body); 
 
    if (book.affected === 1){ 
        const updatedBook = await getRepository(Books).findOne(id); 
        return response.json(updatedBook);   
    } 
     
    return response.status(404).json({ message: 'Livro não encontrado' });  
};    
 
export const statusBook = async (request: Request, response: Response) => { 
    const { id } = request.params;  
    const book = await getRepository(Books).findOne(id);   
    
    if (book !== undefined){    
        book.status = !book.status 
        const updatedBook = await getRepository(Books).update(id, book);   
        if (book.status === true){  
            return response.json(book.title + ' está disponível');
        }  
        if (book.status === false){ 
            return response.json(book.title + ' está indisponível');
        }
    }
    return response.status(404).json({ message: 'Livro não encontrado' });   
};
 
export const deleteBook = async (request: Request, response: Response) => { 
    const { id } = request.params; 
    const book = await getRepository(Books).delete(id); 
 
    if (book.affected === 1){ 
        const bookUpdate = await getRepository(Books).findOne(id)
        return response.json({ message: 'Livro removido!' })
    } 
     
    return response.status(404).json({ message: 'Livro não encontrado' });  
}  
 
