import React, { useState } from 'react';
import { useEffect } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';




const Exchanges = () => {
  
  const [exchangesDetals,setExchangesDetails]=useState('')
 // Note: To access this endpoint you need premium plan
 useEffect(()=>{
  fetch(`https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=50&offset=0&orderBy=24hVolume&orderDirection=desc`,{
    method: 'GET',
headers: {
  'X-RapidAPI-Key': '800ec5b813mshb53a0c48468de75p13c278jsn984ae25b6360',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
  }).then(res=>res.json()).then(data=>{setExchangesDetails(data.data.exchanges);})
},[])
  return (
    <>
    {console.log(exchangesDetals)}
    {exchangesDetals &&
      <>
        <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesDetals.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Collapse.Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Typography.Text><strong>{exchange.rank}.</strong></Typography.Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Typography.Text><strong>{exchange.name}</strong></Typography.Text>
                    </Col>
                    <Col span={6}>$22.48B</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>6.1%</Col>
                  </Row>
                  )}
              >
                Binance is an operator of a blockchain-based cryptocurrency exchange intended to facilitate exchanges at a lower trading costs. The company provides access to digital currency pairs that can be exchanged on the market, while offering security, liquidity, and a safe cryptocurrency exchange. Binance features a strong emphasis on altcoin trading, offering crypto-to-crypto trading in more than 600 cryptocurrencies and virtual tokens, including popular Bitcoin (BTC), Ether (ETH), Litecoin (LTC), Dogecoin (DOGE), and its own Binance Coin (BNB).


Founded in 2017 by Changpeng Zhao and Yi He, the company moved its headquarters to Malta in 2018, in response to increasing regulations on cryptocurrency in China.
              </Collapse.Panel>
            </Collapse>
          </Col>
        ))} 
      </Row>
      </>
    }
      
    </>
  );
};

export default Exchanges;