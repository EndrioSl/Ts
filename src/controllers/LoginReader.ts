import { Readers } from "../entity/Readers"; 
import { comparePasswords,hash } from "../common/bcrypt.helpers";
import { getRepository, SimpleConsoleLogger } from "typeorm";
        
const READER_RELATIONS = { relations: ['libraries'] }; 
const NO_READER_RELATIONS = {}; 

export const validateLogin = async (email: string, password: string): Promise<Readers> => {
    let readerLogin: Readers = null;

    const reader = await findByEmail(email); 

    if (reader) {
        const { password: hashedPassword } = reader;
        
        const isPasswordEquals = await comparePasswords(password, hashedPassword); 
        console.log(isPasswordEquals);
        if (isPasswordEquals){ 
            readerLogin = reader;  
        }
    }       
        
    return readerLogin; 
}
  
export const findByEmail = async (email: string, relations=true): Promise<Readers> => {
    const readerRelation = relations ? READER_RELATIONS : NO_READER_RELATIONS;
    const reader = await getRepository(Readers).findOne({
        where: { email },
        ...readerRelation,
    });

    return reader;  
}
 
