import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useLocalStorage('dark', false);

    useEffect(() => {
        document.body.classList.toggle('dark', dark);
    }, [dark])
    
    
    return (
        <ThemeContext.Provider value={{ dark, setDark}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);