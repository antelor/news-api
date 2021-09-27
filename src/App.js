import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Article from './components/Article';
import './App.css';
import sources from './components/sources';

/*this.state.news structure:
array of sources,
sources -> object with sourcename and array of articles
articles -> object with author title, etc
[{
  sourceName: '',
  articles: [
    {
      author: '',
      title: '',
      description: '',
      url: '',
      urlToImage: '',
      publishedAt: '',
      content: ''
    },
  ]
}],*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(`https://newsapi.org/v2/everything?domains=${sources[0].url}&sortBy=popularity&apiKey=5d093ac6111d45a48bf08b3381a0727b`),
      fetch(`https://newsapi.org/v2/everything?domains=${sources[1].url}&sortBy=popularity&apiKey=5d093ac6111d45a48bf08b3381a0727b`)
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then((dataArray) => {
      ReactDOM.render(
      <div>
      {dataArray.map((sourceItem, key) => (
        
        <div className="source-container" key={key}>
          <h2>{sources[key].name}</h2>
          
          {sourceItem.articles.length!==0 ? sourceItem.articles.map((article, keyA) => (
            <div key={keyA}>
                <Article
                  author={article.author}
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  urlToImage={article.urlToImage}
                  publishedAt={article.publishedAt}
                  content={article.content}
                  key = { keyA }
                />            
            </div>
          )) : <div>No articles</div>}
          
        </div>

      ))}
      </div>
      , document.getElementById('articlesDiv'))
    }
    )
  }
  
  render() {
    return (
      <div className="app">
        <h1>News</h1>

        <div id="articlesDiv"></div>

      </div>
    );
  }
}

export default App;