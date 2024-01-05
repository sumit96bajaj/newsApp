import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 1,
    category: "business",
  };
  articles = [];
  constructor() {
    super();
    console.log("i am a constructor from news component");
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }
  async updateNews(pageNumber) {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&category=${this.props.category}&country=${this.props.country}&page=${pageNumber}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.setState({
      loading: false,
    });
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: pageNumber,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);

  }
  fetchMoreData = async () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }), async () => {
      let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&category=${this.props.category}&country=${this.props.country}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      try {
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState((prevState) => ({
          articles: [...prevState.articles, ...parsedData.articles],
          totalResults: parsedData.totalResults,
        }));
        } catch (error) {
        console.error("Error fetching more data:", error);
      }
    });
  };
  componentDidMount = async () => {
    this.updateNews(this.state.page);
  };
  render() {
    return (
      <>
        <h1 className="text-center">Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="className col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://cdn.wionews.com/sites/default/files/2023/06/21/361229-untitled-design-2023-06-21t205143604.png"
                      }
                      newsUrl={element.url}
                      author={element.author ? element.author : "Anonymous"}
                      date={element.publishedAt}
                      source={element.source.name}
                      key={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
