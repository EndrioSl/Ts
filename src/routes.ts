import { Router, Request, Response } from 'express';   
 
import { getBooks, saveBook, getBook, updateBook, statusBook, deleteBook } from './controllers/BookController';
 
const routes: Router = Router(); 
 
routes.get('/books', getBooks); 
routes.get('/books/:id', getBook);  
routes.post('/books/', saveBook); 
routes.put('/books/:id', updateBook);
routes.patch('/books/:id', statusBook);   
routes.delete('/books/:id', deleteBook)

export default routes;