import axios from 'axios'

const TOKEN = "cjoif4pr01qlfp4fl26gcjoif4pr01qlfp4fl270"

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: TOKEN,
        // symbol: 'MSFT'
    }
})