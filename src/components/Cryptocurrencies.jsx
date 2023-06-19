import { Card, Col, Input, Row } from 'antd'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Cryptocurrencies = ({simplified}) => {
  const [coinStat,setCoinStat]=useState([])
  
  function fetchFunc(){
    fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',{
      method: 'GET',
	headers: {
		'X-RapidAPI-Key': '800ec5b813mshb53a0c48468de75p13c278jsn984ae25b6360',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
    }).then(res=>res.json()).then(data=>{
      let coinsArray=[]
      if (simplified){
        for(let i=0;i<10;i++){
          coinsArray.push(data.data.coins[i])
        }
        setCoinStat(coinsArray)
      }else{
        setCoinStat(data.data.coins)
      }
      
      console.log(data)})
  }
  useEffect(()=>{
    fetchFunc()
  },[])

  return (
    <>

      <Row gutter={[32,32]}>
        {coinStat && 
        <>
        
          {coinStat.map((coin)=>(
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={coin.id}>
              <Link to={`/crypto/${coin.uuid}`}>
                <Card 
                  title={`${coin.rank}. ${coin.name}`}
                  extra={<img className='crypto-image' src={coin.iconUrl}/>}
                >
                  <p>Price: {millify(coin.price)}</p>
                  <p>Market Cap: {millify(coin.marketCap)}</p>
                  <p>Daily Change: {millify(coin.change)}</p>
                </Card>
              </Link>
            </Col>
          ))}
        </>}
      </Row>
    </>
  )
}

export default Cryptocurrencies