import { Avatar, Card, Col, Row, Typography } from 'antd'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import demo from '../img/demo.png'

const News = ({simplified}) => {
  const [newsDocs,setNewsDocs]=useState(null)
  const demoImg='../imgdemo.png'
   function fetchNews(){
    fetch(`https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw`,{
	method: 'GET',
	headers: {
		'X-BingApis-SDK': 'true',
		'X-RapidAPI-Key': '800ec5b813mshb53a0c48468de75p13c278jsn984ae25b6360',
		'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
	}
}).then(res=>res.json()).then(data=>{
  let newsArray=[]
  if (simplified){
    for(let i=0;i<6;i++){
      newsArray.push(data.value[i])
    }
   setNewsDocs(newsArray)
  }else{
    setNewsDocs(data.value)
  }
})
  }
  useEffect(()=>{
    fetchNews()
  },[])
  return (
      <>
        {newsDocs && <>
          <Row gutter={[24,24]}>
          {newsDocs.map((news,i)=>(
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                <a href={news.url} target='_blank'>
                  <div className="news-image-container">
                  <Typography.Title className='news-title' level={4}>
                    {news.name}
                  </Typography.Title>
                  <img src='../img/demo.png' alt="" style={{maxHeight:'100px',maxWidth:'200px'}} />
                  </div>
                  <p>{news.description.length>100 ?`${news.description.substring(0,100)} ...` : news.description} </p>
                  <div className="provider-container">
                    <div>
                    <Avatar src={news.provider[0].image.thumbnail.contentUrl } />
                    <Typography.Text className='provider-name'>{news.provider.name}</Typography.Text>
                    </div>
                    <Typography.Text>{moment(news.datePublished).startOf('ss').fromNow()}</Typography.Text>
                  </div>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
        </>}
      </>
    )
}

export default News