import { useState } from "react"



export function AutoComplete() {

    const [input, setInput] = useState('')


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