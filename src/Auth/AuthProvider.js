import { useEffect } from 'react';
import {createContext, useState} from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
        );

    useEffect(() => {
        try{
            localStorage.setItem("user", JSON.stringify(user));
        } catch(error){
            localStorage.removeItem("user");
            console.log(error);
        }
    }) 

    const contextValue = {
        user,
        login(param){
            setUser({id:param.id, nickname: param.user})
        },
        logout(){
            setUser(null); 
        }
    }


    return <AuthContext.Provider value={contextValue}>
         {children}
    </AuthContext.Provider>
}

export default AuthProvider;