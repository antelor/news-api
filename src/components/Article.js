import React from 'react'

function Article({ source, author, title, description, url, urlToImage, publishedAt, content}  ) {
    return (
        <div>
            <div className="article">
                {source.name}{author}{title}{description}{url}{urlToImage}{publishedAt}{content}
            </div>
        </div>
    )
}

export default Article
