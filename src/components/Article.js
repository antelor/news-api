import React from 'react';
import './Article.css';

function Article({ author, title, description, url, urlToImage, publishedAt, content}  ) {
    return (
        <div className="article">
            <a href={url}>
                <img className="art-img" src={urlToImage} alt="article"></img>
            </a>
            
            <div className="art-title">
                {title}
            </div>
            <div className="art-content">
                {description}{content}
            </div>
        </div>
    )
}

export default Article
