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
    };
  }

  async articleFetch( allSources ) {
    let fetchArray = [];
    
    allSources.map((source, key) => {
      let [beginning, name, ...domain] = source.url.split('.');
      let url = name + '.' + domain.join('.');
      fetchArray.push(
        fetch(`https://newsapi.org/v2/everything?domains=${url}&sortBy=popularity&apiKey=5d093ac6111d45a48bf08b3381a0727b`)
      )
    });
      
    Promise.all(fetchArray)
    .then( results => Promise.all(results.map(r => r.json())) )
    .then((dataArray) => {
      
      let articleArray = [];
      
      //only articles
      dataArray.map((item, key) => {
        if (dataArray[key].articles.length > 0) {
          articleArray.push(dataArray[key].articles)
        }
      });
      
      
      ReactDOM.render(
      <div>
      {articleArray.map((sourceItem, key) => (
        
        <div className="source-container" key={key}>
          <h2>{sourceItem[key].source.name}</h2>

          {sourceItem.length!==0 ? sourceItem.map((article, keyA) => (
            <div key={keyA}>
              <h2>{console.log(article)}</h2>
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

  async setSources() {
    return fetch('https://newsapi.org/v2/top-headlines/sources?country=ar&apiKey=5d093ac6111d45a48bf08b3381a0727b')
      .then(data => data.json())
  }

  async componentDidMount() {
    let allSources = await this.setSources();
    this.articleFetch(allSources.sources);
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