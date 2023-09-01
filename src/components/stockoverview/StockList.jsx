import { useEffect, useState } from "react"
import finnHub from "../../apis/finnHub"
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'

export function StockList() {

    const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN'])
    const [stocks, setStocks] = useState([])
    console.log(stocks)

    useEffect(() => {
        let isMounted = true 
        getData(isMounted)
        return () => (isMounted = false)
    }, [])

    async function getData(isMounted) {
        // const responses = []
        //loading state true
        try{
            const responses = await Promise.all(
                watchList.map((item) => {
                    return finnHub.get("/quote?", {
                        params: {
                            symbol: item
                        }
                    })
                })
            )
            // const response1 = await finnHub.get("/quote?", {
            //     params: {
            //         symbol: "MSFT"
            //     }
            // })
            // responses.push(response1.data)
            // // console.log(response.data)
            // const response2 = await finnHub.get("/quote?", {
            //     params: {
            //         symbol: "GOOGL"
            //     }
            // })
            // responses.push(response2.data)
            // const response3 = await finnHub.get("/quote?", {
            //     params: {
            //         symbol: "AMZN"
            //     }
            // })
            // responses.push(response3.data)

            // const responses = Promise.all(
            //     finnHub.get("/quote?", {
            //         params: {
            //             symbol: "MSFT"
            //         }
            //     }),
            //     finnHub.get("/quote?", {
            //         params: {
            //             symbol: "GOOGL"
            //         }
            //     }),
            //     finnHub.get("/quote?", {
            //         params: {
            //             symbol: "AMZN"
            //         }
            //     })
            // )


            if(isMounted) {
                const stockData = responses.map((item) => {
                    return (
                        {
                            data: item.data,
                            symbol: item.config.params.symbol 
                        }
                    )
                })
                setStocks(stockData)
            }
        }catch(error) {
            console.log(error)
        }
    }

    function changeColor(number) {
        return number > 0 ? 'success' : 'danger'
    }
    
    function changeArrow(number) {
        return number > 0 ? <BiSolidUpArrow /> : <BiSolidDownArrow />
    }

    return (
        <div>
            <table className='table table-hover mt-5'>
                <thead style={{ color: 'rgb(79, 89, 102'}}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg%</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks.map((item, index) => {
                            return (
                                <tr className='table-row' key={index}>
                                    <th scope='row'> {item.symbol} </th>
                                    <td> {item.data.c} </td>
                                    <td className={`text-${changeColor(item.data.d)}`}> {item.data.d} {changeArrow(item.data.d)} </td>
                                    <td className={`text-${changeColor(item.data.dp)}`} > {item.data.dp} {changeArrow(item.data.dp)} </td>
                                    <td> {item.data.h} </td>
                                    <td> {item.data.l} </td>
                                    <td> {item.data.o} </td>
                                    <td> {item.data.pc} </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}