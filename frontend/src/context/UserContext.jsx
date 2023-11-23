import {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [apiKey, setApiKey] = useState(null);
    
    return <UserContext.Provider value={{apiKey, setApiKey}}>
            {children}
        </UserContext.Provider>
}