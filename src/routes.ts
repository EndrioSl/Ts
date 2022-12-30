import { Router, Request, Response } from 'express';   
 
import { getBooks, saveBook, getBook, updateBook, statusBook, deleteBook, getBooksLibrary } from './controllers/BookController';
import { getLibraries, getLibrary, saveLibrary, updateLibrary, deleteLibrary, getLibraryLogin} from './controllers/LibraryController';
import { deleteReader, getReader, getReaders, saveReader, updateReader } from './controllers/ReaderController';
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
 
routes.get('/readers', getReaders); 
routes.get('/readers/:id', getReader);  
routes.post('/readers/', saveReader); 
routes.put('/readers/:id', updateReader);
routes.delete('/readers/:id', deleteReader) 


export default routes;
