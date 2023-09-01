import React from 'react'
import { AutoComplete } from '../components/stockoverview/AutoComplete'
import { StockList } from '../components/stockoverview/StockList'

export function StockOverviewPage() {
    return (
        <div>
            <AutoComplete />
            <StockList />
        </div>
    )
}