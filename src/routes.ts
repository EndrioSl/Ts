import { Router, Request, Response } from 'express';   
 
import { getBooks, saveBook, getBook, updateBook, statusBook, deleteBook, getBooksLibrary } from './controllers/BookController';
import { getLibraries, getLibrary, saveLibrary, updateLibrary, deleteLibrary, getLibraryLogin} from './controllers/LibraryController';
const routes: Router = Router(); 
 
routes.get('/books', getBooks); 
routes.get('/books/:id', getBook);  
routes.post('/books', saveBook);  
routes.put('/books/:id', updateBook);
routes.patch('/books/:id', statusBook);   
routes.delete('/books/:id', deleteBook) 
   
routes.post('/library/:libraryId/saveBook', saveBook); 
routes.get('/library/:libraryId/books', getBooksLibrary);  

routes.get('/libraries', getLibraries); 
routes.get('/libraries/:id', getLibrary);  
routes.post('/libraries/', saveLibrary); 
routes.put('/libraries/:id', updateLibrary);
routes.delete('/libraries/:id', deleteLibrary) 
 
routes.post('/LibraryLogin', getLibraryLogin);


export default routes;
