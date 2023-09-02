import { useEffect, useState } from "react"
import finnHub from "../../apis/finnHub"

export function AutoComplete() {

    const [input, setInput] = useState('')
    console.log(input)

    useEffect(() => {
        console.log('effect ran')
        if(input.length > 0) {
            getSearchedStock()
        }
    }, [input])

    async function getSearchedStock() {
        try {
            const response = await finnHub.get("/search?", {
                params: {
                    q: input
                }
            })
            console.log(response)
        }catch(error) { 

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
                <ul className='dropdown-menu'>
                    <li>stock1</li>
                    <li>stock2</li>
                    <li>stock3</li>
                </ul>
            </div>
        </div>
    )
}