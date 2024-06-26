import React from "react";
import "../css/App.css";
import logo from '../img/book-logo-trans.png'

function News(props) {
  return (
    <section id="news-sec">
      <div className="news">
        <div className="img-and-shadow">
          <div className="img-glow"></div>
        <img src={logo} alt="" className="news-icon"/>
        </div>
        <div className="news-container">
          <div className="lines"></div>
          <div className="news-content">
              <h2 className="news-heading">{props.title}</h2>
              <p className="news-text">{props.desc} </p>
          </div>
        </div>
      </div>
    </section>
  );
}

News.defaultProps = {
  title: "Hello, This is Sanjoy Garai & How are you ?",
  desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum repudiandae repellat aut ea labore consequuntur pariatur atque doloremque voluptatem ad. Eius adipisci quis hic, accusantium corrupti ducimus sed excepturi eum voluptatum dolorem repellat nulla impedit commodi fuga necessitatibus iure odit ",
  slug: "p1"
};

export default News;
