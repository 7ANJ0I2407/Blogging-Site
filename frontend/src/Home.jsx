import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Newslist from './components/NewsList'
// import
function Home() {
  return (
    <>
      <Header home={true}/>
      <section className='news-section'>
      <span className="section-heading">
        <h2>Least Recent</h2>
      </span>  
      <Newslist/>
      </section>
      <Footer/>
    </>
  )
}

export default Home;
