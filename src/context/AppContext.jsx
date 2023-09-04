import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()





export function AppContextProvider({children}) {

  const [watchList, setWatchList] = useState(
    localStorage.getItem('watchList')?.split(',') || ['GOOGL']
  )
  console.log(watchList)

  useEffect(() => {

    localStorage.setItem('watchList', watchList)

  }, [watchList])
    
    // function 

    return (
        <AppContext.Provider value={{ watchList, setWatchList }}>
          { children }
        </AppContext.Provider>
    )
}

