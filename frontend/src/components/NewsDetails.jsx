import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const NewsAPIURL = process.env.REACT_APP_NEWS_API_URL;

function NewsDetail() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${NewsAPIURL}/${slug}`);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching the news:", error);
      }
    };

    fetchNews();
  }, [slug]);

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div className="news-detail">
      <h2>{news.title}</h2>
      <p>{news.description}</p>
    </div>
  );
}

export default NewsDetail;
