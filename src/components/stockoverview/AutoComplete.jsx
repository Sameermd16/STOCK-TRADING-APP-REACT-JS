import { useContext, useEffect, useState } from "react"
import finnHub from "../../apis/finnHub"
import { AppContext } from "../../context/AppContext"

export function AutoComplete() {

    const [input, setInput] = useState('')
    // console.log(input)
    const [results, setResults] = useState([])
    console.log(results)

    const { watchList, setWatchList } = useContext(AppContext)
    console.log(watchList)

    useEffect(() => {
        // console.log('effect ran')
        let isMounted = true
        async function getSearchedStock() {
            try {
                const response = await finnHub.get("/search?", {
                    params: {
                        q: input
                    }
                })
                // console.log(response.data.result)
                setResults(response.data.result)
            }catch(error) { 
    
            }
        }
        if(input.length > 0) {
            getSearchedStock()
        } else {
            setResults([])
        }
        return () => (isMounted = false)
    }, [input])

    function showingStockList() {
        if(input.length > 0) {
            return 'show' 
        }
    }

    function addToStockList(symbol) {
        if(watchList.indexOf(symbol) === - 1) {
            setWatchList([...watchList, symbol])
        }
    }

    return (
        <div className='w-50 p-5 rounded mx-auto'>
            <div className='form-floating dropdown'>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder='search'
                    id='search'
                />
                <ul className={`dropdown-menu ${showingStockList()}`} 
                    style={{
                        height: '500px',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        cursor: 'pointer'
                    }}
                >
                    {
                        results.map((item, index) => {
                            const { description, symbol } = item
                            return (
                                <li key={index} className='dropdown-item'
                                    onClick={() => {
                                        addToStockList(symbol)
                                        setInput('')
                                    }}
                                > 
                                    {description}
                                    ({symbol}) 
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}