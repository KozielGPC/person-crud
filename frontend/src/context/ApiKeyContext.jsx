import {createContext, useEffect, useState} from 'react';
import api from '../providers/api';

export const ApiKeyContext = createContext();

export const ApiKeyProvider = ({children}) => {
    const [apiKey, setApiKey] = useState(null);
    const [validApiKey, setValidApiKey] = useState(false);

    useEffect(() => {
        if (validApiKey) {
            api.defaults.headers.common['x-api-key'] = apiKey;
        }
    }, [validApiKey]);

    return <ApiKeyContext.Provider value={{apiKey, setApiKey, validApiKey, setValidApiKey}}>
            {children}
        </ApiKeyContext.Provider>
}