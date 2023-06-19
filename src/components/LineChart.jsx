import React, { useState,useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const LineChart = ({timePeriod,currentPrice,coinName}) => {
    const coinPrice = [];
    const coinTimestamp = [];
    const [coinHistory,setCoinHistory]=useState('')
    const coinId=useParams()
    useEffect(()=>{
        

        const request = async () => {
          const response = await fetch(`https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=${coinId.coinId}&timePeriod=${timePeriod}`,{
            method: 'GET',
          headers: {
              'X-RapidAPI-Key': '800ec5b813mshb53a0c48468de75p13c278jsn984ae25b6360',
              'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
          }
          });
          const json = await response.json();
          setCoinHistory(json.data)
      }
      request()
      },[])
      
      let data;
      let options;
    if (coinHistory){
      for (let i = 0; i < coinHistory.history.length; i += 1) {
        coinPrice.push(coinHistory.history[i].price);
      }
      
      for (let i = 0; i < coinHistory.history.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory.history[i].timestamp));
        console.log(coinHistory.history[i].timestamp)
      }
       data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
       options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    }
   
    return (
      <>
        {coinHistory &&
        <>
        <Row className="chart-header">
        <Typography.Title level={2} className="chart-Typography.Title">{coinName} Price Chart </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">Change: {coinHistory.change} %</Typography.Title>
          <Typography.Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} /> 
      </>
      }
      </>
    );
   };

export default LineChart