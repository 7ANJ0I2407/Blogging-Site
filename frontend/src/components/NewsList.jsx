import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import News from './News';

function News_list(props) {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(process.env.REACT_APP_POST_API_URL, 
          {
            headers: {
              token : localStorage.getItem('token')
            }
          }
        ); 
        setNewsList(response.data); //  response.data is an array of posts
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <>
      {newsList.map((newsItem) => (
        <News
          key={newsItem._id}
          title={newsItem.title}
          desc={newsItem.description}
          // slug={newsItem.slug}
        />
      ))}
    </>
  );
}

News_list.propTypes = {
  list_length: PropTypes.number,
};


export default News_list;
