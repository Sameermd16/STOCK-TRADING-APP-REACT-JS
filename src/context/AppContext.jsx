import React, { createContext, useState } from 'react'

export const AppContext = createContext()


export function AppContextProvider({children}) {
    const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN'])

    // function 

    return (
        <AppContext.Provider value={{ watchList, setWatchList}}>
          {children}
        </AppContext.Provider>
    )
}

