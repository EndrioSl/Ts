import "reflect-metadata";  
import { createConnection } from "typeorm"; 
import express from 'express';  
import cors from 'cors';
import routes from './routes';   
 
import './database/connect';    
 
const app = express() 
createConnection() 
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3010, () => console.log(`🔥 - Server running on port 3010`))