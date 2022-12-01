import { Libraries } from "../entity/Libraries"; 
import { Request, Response } from "express";   
import { comparePassowords,hash } from "../common/bcrypt.helpers";
import { getRepository } from "typeorm";
        
const LIBRARY_RELATIONS = { relations: ['books'] }; 
const NO_LIBRARY_RELATIONS = {}; 

export const validateLogin = async (email: string, Password: string): Promise<Libraries> => {
    let libraryLogin: Libraries = null;

    const library = await findByEmail(email);

    if (library) {
        const { password } = libraryLogin;
        
        const isPasswordEquals = await comparePassowords(password, Password);
        if (isPasswordEquals)
        libraryLogin = library; 
    }       
        
    return libraryLogin; 
}
  
export const findByEmail = async (email: string, relations=true): Promise<Libraries> => {
    const libraryRelation = relations ? LIBRARY_RELATIONS : NO_LIBRARY_RELATIONS;
    const library = await getRepository(Libraries).findOne({
        where: { email },
        ...libraryRelation,
    });

    return library;  
}
 