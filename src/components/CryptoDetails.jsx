import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import HTMLReactParser from 'html-react-parser';
import LineChart from './LineChart';

const CryptoDetails = () => {
  const {coinId}=useParams()
  const [cryptoDetails,setCryptoDetails]=useState('')
  const [timePeriod,setTimePeriod]=useState('7d')
  const [coinHistory,setCoinHistory]=useState('')
  useEffect(()=>{
    fetch(`https://coinranking1.p.rapidapi.com/coin/${coinId}`,{
      method: 'GET',
	headers: {
		'X-RapidAPI-Key': '800ec5b813mshb53a0c48468de75p13c278jsn984ae25b6360',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
    }).then(res=>res.json()).then(data=>{setCryptoDetails(data.data.coin);})
  },[])
  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails.Volume && millify(cryptoDetails)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading'>
        <Typography.Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Typography.Title>
        <p>
          {cryptoDetails.name} live price in dollars.
          View value statistics , market cap and supply.
        </p>
      </Col>
      <Select defaultValue='7d' className='select-timeperiod' placeholder='Select Time Period' onChange={(value)=>setTimePeriod(value)}>
        {time.map(date=><Select.Option key={date}>{date}</Select.Option>)}
      </Select>
      {/* <LineChart timePeriod={timePeriod} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/> */}
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Typography.Title level={3} className='coin-detales-heading'>
              {cryptoDetails.name} Value Statistics
            </Typography.Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>
          {stats.map(({icon,title,value})=>(
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Typography.Text>
                  {icon}
                </Typography.Text>
                <Typography.Text>
                  {title}
                </Typography.Text>
                
              </Col>
              <Typography.Text className='stats'>{value}</Typography.Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Typography.Title level={3} className='coin-detales-heading'>
              Other Statistics
            </Typography.Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>
          {genericStats.map(({icon,title,value})=>(
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Typography.Text>
                  {icon}
                </Typography.Text>
                <Typography.Text>
                  {title}
                </Typography.Text>
                
              </Col>
              <Typography.Text className='stats'>{value}</Typography.Text>
            </Col>
          ))}
        </Col>
      </Col>
      
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Typography.Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Typography.Title>
          {cryptoDetails.description}
        </Row>
        <Col className="coin-links">
          <Typography.Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Typography.Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Typography.Title level={5} className="link-name">{link.type}</Typography.Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails