import { Typography,Row,Col,Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import millify from 'millify'
import {News,Cryptocurrencies} from '../components'
import { Link } from 'react-router-dom'

const Homepage = () => {

  const [coinsStat,setCoinStat]=useState('')
  useEffect(()=>{
    fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',{
      method: 'GET',
	headers: {
		'X-RapidAPI-Key': '800ec5b813mshb53a0c48468de75p13c278jsn984ae25b6360',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
    }).then(res=>res.json()).then(data=>{setCoinStat(data)
    console.log(data,'yes')})
  },[])
  return (
    <>
     {coinsStat && <>
      <Typography.Title level={2} className='heading'>
      Global Crypto 
    </Typography.Title>
    <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={coinsStat.data.stats.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(coinsStat.data.stats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value={`$${millify(coinsStat.data.stats.totalMarketCap)}`} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(coinsStat.data.stats.total24hVolume)}`} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(coinsStat.data.stats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">Top 10 Cryptos In The World</Typography.Title>
        <Typography.Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Typography.Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">Latest Crypto News</Typography.Title>
        <Typography.Title level={3}><Link to="/news">Show more</Link></Typography.Title>
      </div>
      <News simplified />
     </>}
    </>
  )
}

export default Homepage