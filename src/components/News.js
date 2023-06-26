import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    const api_url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2327f4a0998f40148c2f2d4aaa7f6cea&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({
      loading: true,
    });

    let data = await fetch(api_url);
    let parsedData = await data.json();
    //console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    //console.log("cdm");
    // let api_url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e053c4d42fa409ea7399329def6bcf9&page=1&pageSize=${this.props.pageSize}`;

    // this.setState({
    //   loading: true,
    // });
    // let data = await fetch(api_url);
    // let parsedData = await data.json();
    // //console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });

    this.updateNews();
  }

  handlePreviousClick = async () => {
    //console.log("Previous button works");

    // let api_url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=2e053c4d42fa409ea7399329def6bcf9&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;

    // this.setState({
    //   loading: true,
    // });
    // let data = await fetch(api_url);
    // let parsedData = await data.json();
    // //console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });

    await this.setState({
      page: this.state.page - 1,
    });

    this.updateNews();
  };

  handleNextClick = async () => {
    //console.log("Next button works");

    // let totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

    // if (!(this.state.page + 1 > totalPages)) {
    //   let api_url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=2e053c4d42fa409ea7399329def6bcf9&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;

    //   this.setState({
    //     loading: true,
    //   });
    //   let data = await fetch(api_url);
    //   let parsedData = await data.json();
    //   //console.log(parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }

    await this.setState({
      page: this.state.page + 1,
    });

    this.updateNews();
  };

  render() {
    //console.log("render");
    return (
      <div className="container my-3">
        <h1 className="mb-4 text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>

        {this.state.loading && <Spinner />}

        <div className="row">
          {/* iterae through articles array */}
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={
                      element.description
                        ? element.description.slice(0, 121)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
