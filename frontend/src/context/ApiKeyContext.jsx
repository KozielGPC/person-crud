import {createContext, useState} from 'react';
export const ApiKeyContext = createContext();

export const ApiKeyProvider = ({children}) => {
    const [apiKey, setApiKey] = useState(null);
    const [validApiKey, setValidApiKey] = useState(false);

    return <ApiKeyContext.Provider value={{apiKey, setApiKey, validApiKey, setValidApiKey}}>
            {children}
        </ApiKeyContext.Provider>
}