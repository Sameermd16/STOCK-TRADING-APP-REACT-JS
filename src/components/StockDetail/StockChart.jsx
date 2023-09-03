import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import finnHub from '../../apis/finnHub'

export function StockChart({ chartData, symbol }) {

    const { day, week, month, year } = chartData
    const [dateFormat, setDateFormat] = useState('1d')
    console.log(dateFormat)

    const [companyProfile, setCompanyProfile] = useState([]) 
    const { country, name, ipo, exchange, weburl, marketCapitalization, ticker, shareOutstanding, finnhubIndustry } = companyProfile
    console.log(companyProfile)

    useEffect(() => {
        let isMounted = true 
        console.log("this ran")
        async function fetchCompanyProfile() {
                try {
                    const response =  await finnHub.get('/stock/profile2?', {
                        params: {
                            symbol
                        }
                    })
                    console.log(response.data)
                    if(isMounted) {
                        setCompanyProfile(response.data)
                    }
                } catch(error) {

                }
        } 
        fetchCompanyProfile()
        return () => (isMounted = false) 
    }, [symbol])

    const color = timeFormatter()[timeFormatter().length - 1].y - timeFormatter()[0].y > 0 ? '#26C281' : '#ed3419'
    console.log(color)

    const options = {
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: '24px'
            }
        },
        chart: {
            id: 'stock data',
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
            }
        },

        colors: [color]
        // tooltip: {
        //     x: {
        //         format: 'MM dd HH:MM'
        //     }
        // }
    }

    const series = [{
        name: symbol,
        data: timeFormatter()
    }]

    function timeFormatter() {
        
            if(dateFormat === '1d') {
                return day
            } else if(dateFormat === '7d') {
                return week
            } else if(dateFormat === '30d') {
                return month
            } else if(dateFormat === '365d') {
                return year
            } else {
                return day
            }
    }

    function selectedButton(timeFrame) {
        let classes 
        if(timeFrame === dateFormat) {
            return classes = 'btn btn-sm me-2 btn-primary'
        } else {
            return classes = 'btn btn-sm me-2 btn-outline-primary'
        }
    }


    
    // function chartBgColor() {

    //     chart data is an object, below method cannot be performed
    //     chartData.map((item) => {
    //         if(item[0].y > item[length - 1].y) {
    //              return  '#ed3419'
    //         }else if(item[length - 1].y > item[0].y) {
    //             return '#26C281'
    //         } else {
    //             return 'blue'
    //         }
    //     })
    // }


    return (
        <>
            <div className='mt-5 p-4 shadow-sm bg-white'>
                <Chart options={options} series={series} type="area"  width='100%' />
                <button 
                    className={selectedButton('1d')} 
                    onClick={() => setDateFormat('1d')}
                >
                    1d
                </button>
                <button 
                    className={selectedButton('7d')}  
                    onClick={() => setDateFormat('7d')}
                >
                    7d
                </button>
                <button 
                    className={selectedButton('30d')} 
                    onClick={() => setDateFormat('30d')}
                >
                    30d
                </button>
                <button 
                    className={selectedButton('365d')} 
                    onClick={() => setDateFormat('365d')}
                >
                    365d
                </button>
            </div>
            <div>
                {companyProfile && (
                    <div className='row border bg-white rounded shadow-sm p-4 mt-5'>
                        <div className="col">
                            <div>
                                <span className='fw-bold'> Name: {name} </span>
                            </div>
                            <div>
                                <span className='fw-bold'>Country: {country} </span>
                            </div>
                            <div>
                                <span className='fw-bold'>Ticker: {ticker} </span>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <span className='fw-bold'>Exchange: {exchange} </span>
                            </div>
                            <div>
                                <span className='fw-bold'>Industry: {finnhubIndustry} </span>
                            </div>
                            <div>
                                <span className='fw-bold'>IPO: {ipo} </span>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <span className='fw-bold'>MarketCap: {marketCapitalization} </span>
                            </div>
                            <div>
                                <span className='fw-bold'>Shares Outstanding: {shareOutstanding} </span>
                            </div>
                            <div>
                                <span className='fw-bold'>url: {weburl} </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}