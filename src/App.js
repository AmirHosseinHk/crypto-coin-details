import React from 'react'
import { useRoutes } from 'react-router-dom'
import { Switch,Link,Route } from 'react-router-dom'
import { Layout,Typography,Space } from 'antd'
import { Navbar,CryptoDetails,Cryptocurrencies,News,Homepage,Exchanges } from './components'
import routes from './routes.js'
import './App.css'

function App() {
    const route=useRoutes(routes)
  return (
    <div className="app">
        <div className="navbar">
            <Navbar />
        </div>
        <div className="main">
            <Layout>
                {route}
            </Layout>

        
        <div className="footer">
            <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
                Cryptoverse <br />
                All rights reserved
            </Typography.Title>
            <Space>
                <Link to={'/'}>Home</Link>
                <Link to={'/exchanges'}>Exchanges</Link>
                <Link to={'/news'}>News</Link>
            </Space>
        </div>
        </div>
    </div>
)
}

export default App