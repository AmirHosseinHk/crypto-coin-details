import { CryptoDetails,Cryptocurrencies,News,Homepage,Exchanges } from './components'

let routes=[
    {path:'/',element:<Homepage />},
    {path:'/exhanges',element:<Exchanges />},
    {path:'/cryptocurrencies',element:<Cryptocurrencies />},
    {path:'/crypto/:coinId',element:<CryptoDetails />},
    {path:'/news',element:<News />},
]

export default routes