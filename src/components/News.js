import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize:1,
    category:"business"
  }
  articles = [];
  constructor() {
    super();
    console.log("i am a constructor from news component");
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
    };
  }
  previousPageContent = async () => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=0ee773a33693495d8cbcc97270bf174b&category=${this.props.category}&country=${this.props.country}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
        loading:true
    })
    let data = await fetch(url);
    this.setState({
        loading:false
    })
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
    });
  };
  nextPageContent = async () => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=0ee773a33693495d8cbcc97270bf174b&category=${this.props.category}&country=${this.props.country}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
        loading:true
    })
    let data = await fetch(url);
    this.setState({
        loading:false
    })
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
    });
  };
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=0ee773a33693495d8cbcc97270bf174b&category=${this.props.category}&country=${this.props.country}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
        loading:true
    })
    let data = await fetch(url);
    this.setState({
        loading:false
    })
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
    });
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&this.state.articles.map((element) => {
            return (
              <div className="className col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://cdn.wionews.com/sites/default/files/2023/06/21/361229-untitled-design-2023-06-21t205143604.png"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.previousPageContent}
            className="btn btn-secondary mx-3"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.nextPageContent}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
News.propTypes = {
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
};
export default News;
