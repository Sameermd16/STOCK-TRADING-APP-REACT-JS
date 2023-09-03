import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from '../apis/finnHub'
import { StockChart } from '../components/StockDetail/StockChart'



export function StockDetailPage() {

    const [chartData, setChartData] = useState()
    console.log(chartData)

    const [loading, setLoading] = useState(false)

    // const params = useParams()
    // console.log(params)
    const { symbol } = useParams()

    const date = new Date()
    // console.log(date)
    const currentTime = Math.floor(date.getTime() / 1000)  //this will be milliseconds which needs coversion to seconds
    // console.log(currentTime)
    //one day data; on saturday -> past 2 days ; on sunday -> past 3 days 
    let oneDayAgo = currentTime - (60 * 60 * 24)
    if(date.getDay() === 6) {
        oneDayAgo = currentTime - (60 * 60 * 24 * 2)
    } else if(date.getDay() === 0) {
        oneDayAgo = currentTime - (60 * 60 * 24 * 3)
    }
    // console.log(oneDayAgo)

    //one week data 
    const oneWeekAgo = currentTime - (60 * 60 * 24 * 7)
    // console.log(oneWeekAgo)

    //one month data 
    const oneMonthAgo = currentTime - (60 * 60 * 24 * 30)

    //one year data 
    const oneYearAgo = currentTime - (60 * 60 * 24 * 365)
    // console.log(oneYearAgo)

    function formatData(data) {
        return data.t.map((time, index) => {
            return ({
                x: time * 1000,
                y: Math.floor(data.c[index]) 
            })
        })
    }

    useEffect(() => {
        async function fetchData() {
            // const responseOneDay = await finnHub.get("stock/candle?", {
            //     params: {
            //         symbol,
            //         resolution: 60,
            //         from: oneDayAgo,
            //         to: currentTime
            //     }
            // })

            // const responseOneWeek = await finnHub.get("stock/candle?", {
            //     params: {
            //         symbol, 
            //         resolution: 'D',
            //         from: oneWeekAgo,
            //         to: currentTime
            //     }
            // })

            // const responseOneMonth = await finnHub.get("stock/candle?", {
            //     params: {
            //         symbol,
            //         resolution: 'W',
            //         from: oneMonthAgo,
            //         to: currentTime
            //     }
            // })

            // const responseOneYear = await finnHub.get("stock/candle?", {
            //     params: {
            //         symbol,
            //         resolution: 'W',
            //         from: oneYearAgo,
            //         to: currentTime
            //     }
            // })
            setLoading(true)
            try {
                const responses = await Promise.all([
                    finnHub.get('stock/candle?', {
                        params: {
                            symbol,
                            resolution: 60,
                            from: oneDayAgo,
                            to: currentTime
                        }
                    }),
                    finnHub.get('stock/candle?', {
                        params: {
                            symbol,
                            resolution: 'D',
                            from: oneWeekAgo,
                            to: currentTime
                        }
                    }),
                    finnHub.get("stock/candle?", {
                        params: {
                            symbol,
                            resolution: 'W',
                            from: oneMonthAgo,
                            to: currentTime
                        }
                    }),
                    finnHub.get("stock/candle?", {
                        params: {
                            symbol,
                            resolution: 'W',
                            from: oneYearAgo,
                            to: currentTime
                        }
                    })
                ])
                console.log(responses)
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    month: formatData(responses[2].data),
                    year: formatData(responses[3].data)
                })
                setLoading(false)
            } catch(error) {

            }
        }
        fetchData()
    }, [symbol])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            {chartData && (
                <StockChart chartData={chartData} symbol={symbol} />
            )}
        </div>
    )
}


