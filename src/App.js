import React, { Component } from 'react';
import Article from './components/Article';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [{
        source: { id: '', name: '' },
        author: '',
        title: '',
        description: '',
        url: '',
        urlToImage: '',
        publishedAt: '',
        content: ''
      }]
    };
  }

  componentDidMount() {
    fetch('https://newsapi.org/v2/everything?q=tesla&from=2021-08-22&sortBy=publishedAt&apiKey=5d093ac6111d45a48bf08b3381a0727b')
    .then(res => res.json())
      .then((data) => {
        let dataArr = [];
        
        Object.keys(data.articles).forEach(key => {
          dataArr.push(data.articles[key])
        })

        this.setState({ news: dataArr });
    })
    .catch(console.log)
  }
  
  render() {
    return (
      <div>
        {this.state.news.map((art, key) => (
          <Article
            source={this.state.news[key].source}
            author={this.state.news[key].author}
            title={this.state.news[key].title}
            description={this.state.news[key].description}
            url={this.state.news[key].url}
            urlToImage={this.state.news[key].urlToImage}
            publishedAt={this.state.news[key].publishedAt}
            content={this.state.news[key].content}
            key={key}
          />
        ))}
      </div>
    );
  }
}

export default App;